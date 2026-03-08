import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

function generateToken(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

// Public — used by magic link page
export const getOfferByToken = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    return await ctx.db
      .query("offers")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();
  },
});

// Admin — list all offers
export const getAllOffers = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.query("offers").order("desc").collect();
  },
});

// Admin — get single offer
export const getOfferById = query({
  args: { id: v.id("offers") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.get(id);
  },
});

// Admin — create offer
export const createOffer = mutation({
  args: {
    companyName: v.string(),
    companyLogo: v.optional(v.string()),
    offerTitle: v.string(),
    description: v.string(),
    infoLink: v.optional(v.string()),
    mvpLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.insert("offers", {
      ...args,
      token: generateToken(),
      createdAt: Date.now(),
    });
  },
});

// Admin — delete offer
export const deleteOffer = mutation({
  args: { id: v.id("offers") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.delete(id);
  },
});

// Public — submit feedback
export const submitFeedback = mutation({
  args: {
    offerId: v.id("offers"),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("feedback", {
      ...args,
      submittedAt: Date.now(),
    });
  },
});

// Admin — get feedback for an offer
export const getFeedbackForOffer = query({
  args: { offerId: v.id("offers") },
  handler: async (ctx, { offerId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db
      .query("feedback")
      .withIndex("by_offer", (q) => q.eq("offerId", offerId))
      .order("desc")
      .collect();
  },
});
