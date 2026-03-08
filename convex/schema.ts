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
});
