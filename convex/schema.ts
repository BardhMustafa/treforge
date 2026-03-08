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
});
