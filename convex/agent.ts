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
