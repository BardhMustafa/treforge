# AI Content Agent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an AI-powered content agent that monitors configurable sources for AI news every 2 days, generates short article drafts via Claude API, and lets you review/approve drafts + tweet them from the admin panel.

**Architecture:** Convex scheduled functions (cron) handle fetching and AI generation. Four new DB tables (sources, sourceItems, drafts, agentRuns) store state. Three new admin pages cover source management, draft review, and run logs. Twitter posting is triggered manually from the admin panel after draft approval.

**Tech Stack:** Convex (actions, mutations, queries, cron), Claude API (`@anthropic-ai/sdk`), `rss-parser`, `cheerio`, Resend (email), Twitter API v2 (OAuth 1.0a via `twitter-api-v2`)

---

## Task 1: Extend Convex Schema

**Files:**
- Modify: `convex/schema.ts`

**Step 1: Add four new tables to schema.ts**

Open `convex/schema.ts` and add the following tables inside `defineSchema({...})`:

```typescript
sources: defineTable({
  name: v.string(),
  url: v.string(),
  type: v.union(v.literal("rss"), v.literal("scrape"), v.literal("twitter")),
  enabled: v.boolean(),
  lastCheckedAt: v.optional(v.number()),
}).index("by_enabled", ["enabled"]),

sourceItems: defineTable({
  sourceId: v.id("sources"),
  url: v.string(),
  title: v.string(),
  content: v.string(),
  fetchedAt: v.number(),
  processed: v.boolean(),
}).index("by_url", ["url"]).index("by_processed", ["processed"]),

drafts: defineTable({
  sourceItemId: v.id("sourceItems"),
  title: v.string(),
  body: v.string(),
  tweetDraft: v.string(),
  status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  publishedAt: v.optional(v.number()),
  tweetStatus: v.union(v.literal("pending"), v.literal("posted")),
}).index("by_status", ["status"]),

agentRuns: defineTable({
  startedAt: v.number(),
  completedAt: v.optional(v.number()),
  itemsFetched: v.number(),
  draftsGenerated: v.number(),
  error: v.optional(v.string()),
}),
```

**Step 2: Deploy schema**

```bash
npx convex dev
```

Expected: No errors, new tables visible in Convex dashboard.

**Step 3: Commit**

```bash
git add convex/schema.ts
git commit -m "feat: add agent schema tables (sources, sourceItems, drafts, agentRuns)"
```

---

## Task 2: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install packages**

```bash
npm install @anthropic-ai/sdk rss-parser cheerio twitter-api-v2 resend
```

**Step 2: Verify installation**

```bash
cat package.json | grep -E "anthropic|rss-parser|cheerio|twitter|resend"
```

Expected: All four packages listed under `dependencies`.

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "feat: install agent dependencies (anthropic, rss-parser, cheerio, twitter-api-v2, resend)"
```

---

## Task 3: Sources Convex Backend (queries + mutations)

**Files:**
- Create: `convex/sources.ts`

**Step 1: Create `convex/sources.ts`**

```typescript
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAllSources = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.query("sources").collect();
  },
});

export const createSource = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    type: v.union(v.literal("rss"), v.literal("scrape"), v.literal("twitter")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.insert("sources", { ...args, enabled: true });
  },
});

export const toggleSource = mutation({
  args: { id: v.id("sources") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const source = await ctx.db.get(id);
    if (!source) throw new Error("Source not found");
    await ctx.db.patch(id, { enabled: !source.enabled });
  },
});

export const deleteSource = mutation({
  args: { id: v.id("sources") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.delete(id);
  },
});
```

**Step 2: Deploy and verify**

```bash
npx convex dev
```

Expected: No errors.

**Step 3: Commit**

```bash
git add convex/sources.ts
git commit -m "feat: add sources convex queries and mutations"
```

---

## Task 4: Drafts Convex Backend (queries + mutations)

**Files:**
- Create: `convex/drafts.ts`

**Step 1: Create `convex/drafts.ts`**

```typescript
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAllDrafts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.query("drafts").order("desc").collect();
  },
});

export const getDraftsByStatus = query({
  args: { status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")) },
  handler: async (ctx, { status }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db
      .query("drafts")
      .withIndex("by_status", (q) => q.eq("status", status))
      .order("desc")
      .collect();
  },
});

export const updateDraft = mutation({
  args: {
    id: v.id("drafts"),
    title: v.optional(v.string()),
    body: v.optional(v.string()),
    tweetDraft: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.patch(id, fields);
  },
});

export const approveDraft = mutation({
  args: { id: v.id("drafts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.patch(id, { status: "approved", publishedAt: Date.now() });
  },
});

export const rejectDraft = mutation({
  args: { id: v.id("drafts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.patch(id, { status: "rejected" });
  },
});

export const markTweetPosted = mutation({
  args: { id: v.id("drafts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.patch(id, { tweetStatus: "posted" });
  },
});
```

**Step 2: Deploy and verify**

```bash
npx convex dev
```

Expected: No errors.

**Step 3: Commit**

```bash
git add convex/drafts.ts
git commit -m "feat: add drafts convex queries and mutations"
```

---

## Task 5: Agent Runs Convex Backend

**Files:**
- Create: `convex/agentRuns.ts`

**Step 1: Create `convex/agentRuns.ts`**

```typescript
import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAgentRuns = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.query("agentRuns").order("desc").take(50);
  },
});
```

**Step 2: Deploy and verify**

```bash
npx convex dev
```

**Step 3: Commit**

```bash
git add convex/agentRuns.ts
git commit -m "feat: add agentRuns convex query"
```

---

## Task 6: Agent Core — Fetch Action

**Files:**
- Create: `convex/agent.ts`

**Step 1: Create `convex/agent.ts` with the fetch logic**

This action fetches all enabled sources and saves new items. It uses `rss-parser` for RSS, `cheerio` for scraping, and the Twitter API for Twitter sources.

```typescript
"use node";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// ── Internal helpers ─────────────────────────────────────────────────────────

export const getEnabledSources = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sources")
      .withIndex("by_enabled", (q) => q.eq("enabled", true))
      .collect();
  },
});

export const itemExistsByUrl = internalQuery({
  args: { url: v.string() },
  handler: async (ctx, { url }) => {
    const existing = await ctx.db
      .query("sourceItems")
      .withIndex("by_url", (q) => q.eq("url", url))
      .first();
    return !!existing;
  },
});

export const saveSourceItem = internalMutation({
  args: {
    sourceId: v.id("sources"),
    url: v.string(),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sourceItems", {
      ...args,
      fetchedAt: Date.now(),
      processed: false,
    });
  },
});

export const getUnprocessedItems = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sourceItems")
      .withIndex("by_processed", (q) => q.eq("processed", false))
      .collect();
  },
});

export const markItemProcessed = internalMutation({
  args: { id: v.id("sourceItems") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { processed: true });
  },
});

export const saveDraft = internalMutation({
  args: {
    sourceItemId: v.id("sourceItems"),
    title: v.string(),
    body: v.string(),
    tweetDraft: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("drafts", {
      ...args,
      status: "pending",
      tweetStatus: "pending",
    });
  },
});

export const createAgentRun = internalMutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.insert("agentRuns", {
      startedAt: Date.now(),
      itemsFetched: 0,
      draftsGenerated: 0,
    });
  },
});

export const updateAgentRun = internalMutation({
  args: {
    id: v.id("agentRuns"),
    completedAt: v.optional(v.number()),
    itemsFetched: v.optional(v.number()),
    draftsGenerated: v.optional(v.number()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const markSourceChecked = internalMutation({
  args: { id: v.id("sources") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { lastCheckedAt: Date.now() });
  },
});

// ── Fetch action ─────────────────────────────────────────────────────────────

export const fetchSources = internalAction({
  args: { runId: v.id("agentRuns") },
  handler: async (ctx, { runId }) => {
    const Parser = (await import("rss-parser")).default;
    const parser = new Parser();

    const sources = await ctx.runQuery(internal.agent.getEnabledSources);
    let itemsFetched = 0;

    for (const source of sources) {
      try {
        if (source.type === "rss") {
          const feed = await parser.parseURL(source.url);
          for (const item of feed.items.slice(0, 10)) {
            if (!item.link) continue;
            const exists = await ctx.runQuery(internal.agent.itemExistsByUrl, { url: item.link });
            if (exists) continue;
            await ctx.runMutation(internal.agent.saveSourceItem, {
              sourceId: source._id,
              url: item.link,
              title: item.title ?? "Untitled",
              content: item.contentSnippet ?? item.content ?? item.summary ?? "",
            });
            itemsFetched++;
          }
        } else if (source.type === "scrape") {
          const { load } = await import("cheerio");
          const res = await fetch(source.url);
          const html = await res.text();
          const $ = load(html);
          const links: { url: string; title: string; content: string }[] = [];
          $("a").each((_, el) => {
            const href = $(el).attr("href");
            const text = $(el).text().trim();
            if (href && text.length > 20 && href.startsWith("http")) {
              links.push({ url: href, title: text, content: text });
            }
          });
          for (const link of links.slice(0, 5)) {
            const exists = await ctx.runQuery(internal.agent.itemExistsByUrl, { url: link.url });
            if (exists) continue;
            await ctx.runMutation(internal.agent.saveSourceItem, {
              sourceId: source._id,
              url: link.url,
              title: link.title,
              content: link.content,
            });
            itemsFetched++;
          }
        }
        // Twitter type: skipped for now — requires OAuth setup
        await ctx.runMutation(internal.agent.markSourceChecked, { id: source._id });
      } catch (err) {
        console.error(`Failed to fetch source ${source.name}:`, err);
      }
    }

    await ctx.runMutation(internal.agent.updateAgentRun, { id: runId, itemsFetched });
    return itemsFetched;
  },
});
```

**Step 2: Deploy and verify**

```bash
npx convex dev
```

Expected: No TypeScript errors.

**Step 3: Commit**

```bash
git add convex/agent.ts
git commit -m "feat: add agent fetch action and internal helpers"
```

---

## Task 7: Agent Core — Generate Action (Claude API)

**Files:**
- Modify: `convex/agent.ts`

**Step 1: Add the generate action to `convex/agent.ts`**

Append this to the bottom of `convex/agent.ts`:

```typescript
// ── Generate action ───────────────────────────────────────────────────────────

export const generateDrafts = internalAction({
  args: { runId: v.id("agentRuns") },
  handler: async (ctx, { runId }) => {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const items = await ctx.runQuery(internal.agent.getUnprocessedItems);
    let draftsGenerated = 0;

    for (const item of items) {
      try {
        const message = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: `You are a tech blogger who writes sharp, concise takes on AI news.

Here is a news item:
Title: ${item.title}
URL: ${item.url}
Content: ${item.content}

Is this genuinely interesting and relevant AI news worth writing about?

If YES: respond in this exact JSON format (no markdown, no extra text):
{
  "interesting": true,
  "title": "Your engaging title here",
  "body": "Your 150-300 word personal take here. Be insightful and direct.",
  "tweet": "Your 1-2 sentence tweet here. Max 280 chars."
}

If NO: respond with exactly: {"interesting": false}`,
            },
          ],
        });

        const text = message.content[0].type === "text" ? message.content[0].text : "";
        const parsed = JSON.parse(text);

        if (parsed.interesting) {
          await ctx.runMutation(internal.agent.saveDraft, {
            sourceItemId: item._id,
            title: parsed.title,
            body: parsed.body,
            tweetDraft: parsed.tweet,
          });
          draftsGenerated++;
        }
      } catch (err) {
        console.error(`Failed to generate draft for item ${item._id}:`, err);
      } finally {
        await ctx.runMutation(internal.agent.markItemProcessed, { id: item._id });
      }
    }

    await ctx.runMutation(internal.agent.updateAgentRun, { id: runId, draftsGenerated });
    return draftsGenerated;
  },
});
```

**Step 2: Set `ANTHROPIC_API_KEY` in Convex env**

Go to the Convex dashboard → your project → Settings → Environment Variables. Add:
- `ANTHROPIC_API_KEY` = your Anthropic API key

Or via CLI:
```bash
npx convex env set ANTHROPIC_API_KEY sk-ant-...
```

**Step 3: Deploy and verify**

```bash
npx convex dev
```

Expected: No TypeScript errors.

**Step 4: Commit**

```bash
git add convex/agent.ts
git commit -m "feat: add Claude API draft generation action"
```

---

## Task 8: Agent Core — Email Notification + Main Run Action

**Files:**
- Modify: `convex/agent.ts`

**Step 1: Append the notify + run actions to `convex/agent.ts`**

```typescript
// ── Notify action ─────────────────────────────────────────────────────────────

export const notifyNewDrafts = internalAction({
  args: { draftsGenerated: v.number() },
  handler: async (ctx, { draftsGenerated }) => {
    if (draftsGenerated === 0) return;
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "agent@treforge.dev",  // update to your verified Resend domain
      to: process.env.NOTIFY_EMAIL ?? "",
      subject: `[Treforge] ${draftsGenerated} new draft${draftsGenerated > 1 ? "s" : ""} ready`,
      html: `<p>${draftsGenerated} new AI article draft${draftsGenerated > 1 ? "s are" : " is"} ready for your review.</p><p><a href="https://treforge.dev/admin/drafts">Review drafts →</a></p>`,
    });
  },
});

// ── Main orchestrator ─────────────────────────────────────────────────────────

export const run = internalAction({
  args: {},
  handler: async (ctx) => {
    const runId = await ctx.runMutation(internal.agent.createAgentRun);
    try {
      const itemsFetched = await ctx.runAction(internal.agent.fetchSources, { runId });
      const draftsGenerated = await ctx.runAction(internal.agent.generateDrafts, { runId });
      await ctx.runMutation(internal.agent.updateAgentRun, {
        id: runId,
        completedAt: Date.now(),
        itemsFetched,
        draftsGenerated,
      });
      await ctx.runAction(internal.agent.notifyNewDrafts, { draftsGenerated });
    } catch (err) {
      await ctx.runMutation(internal.agent.updateAgentRun, {
        id: runId,
        completedAt: Date.now(),
        error: String(err),
      });
    }
  },
});
```

**Step 2: Set env vars in Convex**

```bash
npx convex env set RESEND_API_KEY re_...
npx convex env set NOTIFY_EMAIL your@email.com
```

**Step 3: Deploy and verify**

```bash
npx convex dev
```

**Step 4: Commit**

```bash
git add convex/agent.ts
git commit -m "feat: add email notification and main agent run orchestrator"
```

---

## Task 9: Convex Cron Schedule

**Files:**
- Create: `convex/crons.ts`

**Step 1: Create `convex/crons.ts`**

```typescript
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "run AI content agent",
  { days: 2 },
  internal.agent.run,
);

export default crons;
```

**Step 2: Deploy and verify**

```bash
npx convex dev
```

Go to Convex dashboard → Crons. You should see "run AI content agent" listed.

**Step 3: Commit**

```bash
git add convex/crons.ts
git commit -m "feat: add Convex cron to run agent every 2 days"
```

---

## Task 10: Twitter Post Action

**Files:**
- Create: `convex/twitter.ts`

**Step 1: Create `convex/twitter.ts`**

```typescript
"use node";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const postTweet = internalAction({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const { TwitterApi } = await import("twitter-api-v2");
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
    const result = await client.v2.tweet(text);
    return result.data.id;
  },
});
```

**Step 2: Add a public-facing mutation in `convex/drafts.ts` that calls the twitter action**

Append to `convex/drafts.ts`:

```typescript
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const postDraftTweet = action({
  args: { id: v.id("drafts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const draft = await ctx.runQuery(internal.drafts.getDraftById, { id });
    if (!draft) throw new Error("Draft not found");
    if (draft.tweetStatus === "posted") throw new Error("Already posted");
    await ctx.runAction(internal.twitter.postTweet, { text: draft.tweetDraft });
    await ctx.runMutation(internal.drafts.markTweetPosted, { id });
  },
});
```

Also add an internal query to `convex/drafts.ts`:

```typescript
export const getDraftById = internalQuery({
  args: { id: v.id("drafts") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
```

Note: You need to add `internalQuery` to the imports at the top of `convex/drafts.ts`:
```typescript
import { query, mutation, action, internalQuery } from "./_generated/server";
```

**Step 3: Set Twitter env vars**

Get credentials from [developer.twitter.com](https://developer.twitter.com) → your app → Keys and tokens.

```bash
npx convex env set TWITTER_API_KEY ...
npx convex env set TWITTER_API_SECRET ...
npx convex env set TWITTER_ACCESS_TOKEN ...
npx convex env set TWITTER_ACCESS_TOKEN_SECRET ...
```

**Step 4: Deploy and verify**

```bash
npx convex dev
```

**Step 5: Commit**

```bash
git add convex/twitter.ts convex/drafts.ts
git commit -m "feat: add Twitter post action"
```

---

## Task 11: Admin Sources Page

**Files:**
- Create: `src/pages/admin/AdminSourcesPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/pages/admin/AdminLayout.jsx`

**Step 1: Create `src/pages/admin/AdminSourcesPage.jsx`**

```jsx
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const mono = "'Space Mono', monospace";
const accent = "#00ffb4";

export function AdminSourcesPage() {
  const sources = useQuery(api.sources.getAllSources) ?? [];
  const createSource = useMutation(api.sources.createSource);
  const toggleSource = useMutation(api.sources.toggleSource);
  const deleteSource = useMutation(api.sources.deleteSource);

  const [form, setForm] = useState({ name: "", url: "", type: "rss" });
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.url) return;
    await createSource(form);
    setForm({ name: "", url: "", type: "rss" });
    setAdding(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, color: "#fff", letterSpacing: 2 }}>SOURCES</h1>
        <button
          onClick={() => setAdding(!adding)}
          style={{ background: accent, color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer", letterSpacing: 1 }}
        >
          {adding ? "Cancel" : "+ Add Source"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: "rgba(0,255,180,0.05)", border: "1px solid rgba(0,255,180,0.2)", borderRadius: 8, padding: 20, marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>NAME</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Anthropic Blog" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontFamily: mono, fontSize: 12, width: 180 }} />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>URL</label>
            <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontFamily: mono, fontSize: 12, width: 300 }} />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>TYPE</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ background: "#05080e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontFamily: mono, fontSize: 12 }}>
              <option value="rss">RSS</option>
              <option value="scrape">Scrape</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>
          <button type="submit" style={{ background: accent, color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer" }}>Save</button>
        </form>
      )}

      {sources.length === 0 ? (
        <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No sources yet. Add one above.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["Name", "URL", "Type", "Last Checked", "Enabled", ""].map(h => (
                <th key={h} style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "left", padding: "8px 12px", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sources.map(source => (
              <tr key={source._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ fontFamily: mono, fontSize: 13, color: "#fff", padding: "12px" }}>{source.name}</td>
                <td style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "12px", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{source.url}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: accent, background: "rgba(0,255,180,0.1)", padding: "2px 8px", borderRadius: 3 }}>{source.type}</span>
                </td>
                <td style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.3)", padding: "12px" }}>
                  {source.lastCheckedAt ? new Date(source.lastCheckedAt).toLocaleDateString() : "Never"}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => toggleSource({ id: source._id })}
                    style={{ background: source.enabled ? "rgba(0,255,180,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${source.enabled ? "rgba(0,255,180,0.4)" : "rgba(255,255,255,0.1)"}`, color: source.enabled ? accent : "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 3, fontFamily: mono, fontSize: 11, cursor: "pointer" }}
                  >
                    {source.enabled ? "ON" : "OFF"}
                  </button>
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => deleteSource({ id: source._id })}
                    style={{ background: "none", border: "1px solid rgba(255,60,60,0.3)", color: "rgba(255,60,60,0.6)", padding: "3px 10px", borderRadius: 3, fontFamily: mono, fontSize: 11, cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

**Step 2: Add route to `src/App.jsx`**

Import:
```jsx
import { AdminSourcesPage } from "./pages/admin/AdminSourcesPage";
```

Add inside the `/admin` route group:
```jsx
<Route path="sources" element={<AdminSourcesPage />} />
```

**Step 3: Add nav link to `src/pages/admin/AdminLayout.jsx`**

Add after the Offers link:
```jsx
<Link to="/admin/sources" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
  Sources
</Link>
```

**Step 4: Deploy and test**

```bash
npx convex dev
npm run dev
```

Open `http://localhost:5173/admin/sources`. Add a test source (e.g. name: "Anthropic", url: `https://www.anthropic.com/rss.xml`, type: rss). Verify it appears in the list.

**Step 5: Commit**

```bash
git add src/pages/admin/AdminSourcesPage.jsx src/App.jsx src/pages/admin/AdminLayout.jsx
git commit -m "feat: add admin sources management page"
```

---

## Task 12: Admin Drafts Page

**Files:**
- Create: `src/pages/admin/AdminDraftsPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/pages/admin/AdminLayout.jsx`

**Step 1: Create `src/pages/admin/AdminDraftsPage.jsx`**

```jsx
import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

const mono = "'Space Mono', monospace";
const accent = "#00ffb4";

function statusColor(s) {
  if (s === "approved") return "#00ffb4";
  if (s === "rejected") return "#ff4444";
  return "rgba(255,255,255,0.5)";
}

export function AdminDraftsPage() {
  const drafts = useQuery(api.drafts.getAllDrafts) ?? [];
  const updateDraft = useMutation(api.drafts.updateDraft);
  const approveDraft = useMutation(api.drafts.approveDraft);
  const rejectDraft = useMutation(api.drafts.rejectDraft);
  const postTweet = useAction(api.drafts.postDraftTweet);

  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState({});
  const [posting, setPosting] = useState(false);

  const draft = drafts.find(d => d._id === selected);

  const handleSelect = (d) => {
    setSelected(d._id);
    setEditing({ title: d.title, body: d.body, tweetDraft: d.tweetDraft });
  };

  const handleSave = async () => {
    await updateDraft({ id: selected, ...editing });
  };

  const handleApprove = async () => {
    await handleSave();
    await approveDraft({ id: selected });
  };

  const handleReject = async () => {
    await rejectDraft({ id: selected });
    setSelected(null);
  };

  const handlePostTweet = async () => {
    setPosting(true);
    try {
      await postTweet({ id: selected });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 32, height: "calc(100vh - 180px)" }}>
      {/* List */}
      <div style={{ width: 320, flexShrink: 0, overflowY: "auto" }}>
        <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, color: "#fff", letterSpacing: 2, marginBottom: 20 }}>DRAFTS</h1>
        {drafts.length === 0 && (
          <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No drafts yet.</p>
        )}
        {drafts.map(d => (
          <div
            key={d._id}
            onClick={() => handleSelect(d)}
            style={{ padding: "14px 16px", borderRadius: 6, marginBottom: 8, cursor: "pointer", background: selected === d._id ? "rgba(0,255,180,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${selected === d._id ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.06)"}` }}
          >
            <div style={{ fontFamily: mono, fontSize: 12, color: "#fff", marginBottom: 6, lineHeight: 1.4 }}>{d.title}</div>
            <span style={{ fontFamily: mono, fontSize: 10, color: statusColor(d.status), textTransform: "uppercase", letterSpacing: 1 }}>{d.status}</span>
          </div>
        ))}
      </div>

      {/* Detail */}
      {draft ? (
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6, letterSpacing: 1 }}>TITLE</label>
            <input
              value={editing.title ?? ""}
              onChange={e => setEditing(ed => ({ ...ed, title: e.target.value }))}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", borderRadius: 6, fontFamily: mono, fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6, letterSpacing: 1 }}>ARTICLE BODY</label>
            <textarea
              value={editing.body ?? ""}
              onChange={e => setEditing(ed => ({ ...ed, body: e.target.value }))}
              rows={10}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", borderRadius: 6, fontFamily: mono, fontSize: 13, resize: "vertical" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6, letterSpacing: 1 }}>TWEET DRAFT</label>
            <textarea
              value={editing.tweetDraft ?? ""}
              onChange={e => setEditing(ed => ({ ...ed, tweetDraft: e.target.value }))}
              rows={3}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", borderRadius: 6, fontFamily: mono, fontSize: 13, resize: "vertical" }}
            />
            <div style={{ fontFamily: mono, fontSize: 10, color: (editing.tweetDraft?.length ?? 0) > 280 ? "#ff4444" : "rgba(255,255,255,0.3)", marginTop: 4, textAlign: "right" }}>
              {editing.tweetDraft?.length ?? 0}/280
            </div>
          </div>

          {draft.status === "pending" && (
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={handleApprove} style={{ background: accent, color: "#000", border: "none", padding: "10px 24px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer", letterSpacing: 1 }}>Approve</button>
              <button onClick={handleReject} style={{ background: "none", border: "1px solid rgba(255,60,60,0.4)", color: "rgba(255,60,60,0.8)", padding: "10px 24px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer" }}>Reject</button>
            </div>
          )}

          {draft.status === "approved" && draft.tweetStatus === "pending" && (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={handlePostTweet}
                disabled={posting}
                style={{ background: "rgba(29,161,242,0.15)", border: "1px solid rgba(29,161,242,0.4)", color: "rgba(29,161,242,0.9)", padding: "10px 24px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: posting ? "not-allowed" : "pointer", opacity: posting ? 0.6 : 1 }}
              >
                {posting ? "Posting..." : "Post Tweet"}
              </button>
            </div>
          )}

          {draft.tweetStatus === "posted" && (
            <div style={{ fontFamily: mono, fontSize: 12, color: accent }}>Tweet posted.</div>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.2)" }}>Select a draft to review</p>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Add route to `src/App.jsx`**

Import:
```jsx
import { AdminDraftsPage } from "./pages/admin/AdminDraftsPage";
```

Add route:
```jsx
<Route path="drafts" element={<AdminDraftsPage />} />
```

**Step 3: Add nav link to `src/pages/admin/AdminLayout.jsx`**

Add after Sources link:
```jsx
<Link to="/admin/drafts" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
  Drafts
</Link>
```

**Step 4: Test in browser**

```bash
npm run dev
```

Navigate to `http://localhost:5173/admin/drafts`. It should show "No drafts yet."

**Step 5: Commit**

```bash
git add src/pages/admin/AdminDraftsPage.jsx src/App.jsx src/pages/admin/AdminLayout.jsx
git commit -m "feat: add admin drafts review page"
```

---

## Task 13: Admin Agent Runs Log Page

**Files:**
- Create: `src/pages/admin/AdminAgentRunsPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/pages/admin/AdminLayout.jsx`

**Step 1: Create `src/pages/admin/AdminAgentRunsPage.jsx`**

```jsx
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const mono = "'Space Mono', monospace";
const accent = "#00ffb4";

export function AdminAgentRunsPage() {
  const runs = useQuery(api.agentRuns.getAgentRuns) ?? [];

  return (
    <div>
      <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, color: "#fff", letterSpacing: 2, marginBottom: 32 }}>AGENT RUNS</h1>
      {runs.length === 0 ? (
        <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No runs yet. The agent runs every 2 days.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["Started", "Completed", "Items Fetched", "Drafts Generated", "Status"].map(h => (
                <th key={h} style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "left", padding: "8px 12px", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runs.map(run => (
              <tr key={run._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ fontFamily: mono, fontSize: 12, color: "#fff", padding: "12px" }}>
                  {new Date(run.startedAt).toLocaleString()}
                </td>
                <td style={{ fontFamily: mono, fontSize: 12, color: "rgba(255,255,255,0.5)", padding: "12px" }}>
                  {run.completedAt ? new Date(run.completedAt).toLocaleString() : "Running..."}
                </td>
                <td style={{ fontFamily: mono, fontSize: 13, color: accent, padding: "12px" }}>{run.itemsFetched}</td>
                <td style={{ fontFamily: mono, fontSize: 13, color: accent, padding: "12px" }}>{run.draftsGenerated}</td>
                <td style={{ padding: "12px" }}>
                  {run.error ? (
                    <span style={{ fontFamily: mono, fontSize: 11, color: "#ff4444", background: "rgba(255,60,60,0.1)", padding: "2px 8px", borderRadius: 3 }} title={run.error}>Error</span>
                  ) : run.completedAt ? (
                    <span style={{ fontFamily: mono, fontSize: 11, color: accent, background: "rgba(0,255,180,0.1)", padding: "2px 8px", borderRadius: 3 }}>Done</span>
                  ) : (
                    <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 3 }}>Running</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

**Step 2: Add route to `src/App.jsx`**

Import:
```jsx
import { AdminAgentRunsPage } from "./pages/admin/AdminAgentRunsPage";
```

Add route:
```jsx
<Route path="agent-runs" element={<AdminAgentRunsPage />} />
```

**Step 3: Add nav link to `src/pages/admin/AdminLayout.jsx`**

Add after Drafts link:
```jsx
<Link to="/admin/agent-runs" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
  Agent Runs
</Link>
```

**Step 4: Test in browser**

Navigate to `http://localhost:5173/admin/agent-runs`. Should show "No runs yet."

**Step 5: Commit**

```bash
git add src/pages/admin/AdminAgentRunsPage.jsx src/App.jsx src/pages/admin/AdminLayout.jsx
git commit -m "feat: add admin agent runs log page"
```

---

## Task 14: End-to-End Manual Test

**Step 1: Add a real RSS source**

Go to `/admin/sources` and add:
- Name: `Anthropic`
- URL: `https://www.anthropic.com/rss.xml`
- Type: `rss`

**Step 2: Trigger agent run manually from Convex dashboard**

In Convex dashboard → Functions → `agent:run` → Run function (no args needed).

**Step 3: Check agent runs log**

Go to `/admin/agent-runs`. Verify the run completed and shows items fetched + drafts generated.

**Step 4: Review a draft**

Go to `/admin/drafts`. Select a draft, edit if needed, click Approve.

**Step 5: Post tweet (optional — only if Twitter API is configured)**

Click "Post Tweet" on an approved draft.

**Step 6: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: end-to-end agent test adjustments"
```

---

## Setup Checklist

Before running:
- [ ] `ANTHROPIC_API_KEY` set in Convex env
- [ ] `RESEND_API_KEY` set in Convex env
- [ ] `NOTIFY_EMAIL` set in Convex env
- [ ] Resend sender domain verified (or use `onboarding@resend.dev` for testing)
- [ ] Twitter Developer account created at developer.twitter.com
- [ ] Twitter app created with Read + Write permissions
- [ ] `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET` set in Convex env
