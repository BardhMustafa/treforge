import { v } from "convex/values";
import { query, mutation, action, internalQuery } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

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

export const getDraftById = internalQuery({
  args: { id: v.id("drafts") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

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
