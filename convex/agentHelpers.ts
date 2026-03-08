import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

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
