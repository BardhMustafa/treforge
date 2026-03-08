"use node";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// ── Fetch action ─────────────────────────────────────────────────────────────

export const fetchSources = internalAction({
  args: { runId: v.id("agentRuns") },
  handler: async (ctx, { runId }) => {
    const Parser = (await import("rss-parser")).default;
    const parser = new Parser();

    const sources = await ctx.runQuery(internal.agentHelpers.getEnabledSources);
    let itemsFetched = 0;

    for (const source of sources) {
      try {
        if (source.type === "rss") {
          const feed = await parser.parseURL(source.url);
          for (const item of feed.items.slice(0, 10)) {
            if (!item.link) continue;
            const exists = await ctx.runQuery(internal.agentHelpers.itemExistsByUrl, { url: item.link });
            if (exists) continue;
            await ctx.runMutation(internal.agentHelpers.saveSourceItem, {
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
            const exists = await ctx.runQuery(internal.agentHelpers.itemExistsByUrl, { url: link.url });
            if (exists) continue;
            await ctx.runMutation(internal.agentHelpers.saveSourceItem, {
              sourceId: source._id,
              url: link.url,
              title: link.title,
              content: link.content,
            });
            itemsFetched++;
          }
        }
        // Twitter type: skipped for now — requires OAuth setup
        await ctx.runMutation(internal.agentHelpers.markSourceChecked, { id: source._id });
      } catch (err) {
        console.error(`Failed to fetch source ${source.name}:`, err);
      }
    }

    await ctx.runMutation(internal.agentHelpers.updateAgentRun, { id: runId, itemsFetched });
    return itemsFetched;
  },
});

// ── Generate action ───────────────────────────────────────────────────────────

export const generateDrafts = internalAction({
  args: { runId: v.id("agentRuns") },
  handler: async (ctx, { runId }) => {
    const OpenAI = (await import("openai")).default;
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const items = await ctx.runQuery(internal.agentHelpers.getUnprocessedItems);
    let draftsGenerated = 0;

    for (const item of items) {
      try {
        const response = await client.chat.completions.create({
          model: "gpt-4o-mini",
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

        const text = response.choices[0]?.message?.content ?? "";
        const parsed = JSON.parse(text);

        if (parsed.interesting) {
          await ctx.runMutation(internal.agentHelpers.saveDraft, {
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
        await ctx.runMutation(internal.agentHelpers.markItemProcessed, { id: item._id });
      }
    }

    await ctx.runMutation(internal.agentHelpers.updateAgentRun, { id: runId, draftsGenerated });
    return draftsGenerated;
  },
});

// ── Notify action ─────────────────────────────────────────────────────────────

export const notifyNewDrafts = internalAction({
  args: { draftsGenerated: v.number() },
  handler: async (ctx, { draftsGenerated }) => {
    if (draftsGenerated === 0) return;
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "agent@treforge.dev",
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
    const runId = await ctx.runMutation(internal.agentHelpers.createAgentRun);
    try {
      const itemsFetched = await ctx.runAction(internal.agent.fetchSources, { runId });
      const draftsGenerated = await ctx.runAction(internal.agent.generateDrafts, { runId });
      await ctx.runMutation(internal.agentHelpers.updateAgentRun, {
        id: runId,
        completedAt: Date.now(),
        itemsFetched,
        draftsGenerated,
      });
      await ctx.runAction(internal.agent.notifyNewDrafts, { draftsGenerated });
    } catch (err) {
      await ctx.runMutation(internal.agentHelpers.updateAgentRun, {
        id: runId,
        completedAt: Date.now(),
        error: String(err),
      });
    }
  },
});
