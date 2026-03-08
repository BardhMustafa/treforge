import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    updatedAt: v.number(),
    authorId: v.id("users"),
  }).index("by_slug", ["slug"]).index("by_published", ["published"]),

  offers: defineTable({
    companyName: v.string(),
    companyLogo: v.optional(v.string()),
    offerTitle: v.string(),
    description: v.string(),
    infoLink: v.optional(v.string()),
    mvpLink: v.optional(v.string()),
    token: v.string(),
    createdAt: v.number(),
  }).index("by_token", ["token"]),

  feedback: defineTable({
    offerId: v.id("offers"),
    rating: v.number(),
    comment: v.string(),
    submittedAt: v.number(),
  }).index("by_offer", ["offerId"]),
});
