import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// ── Public queries ──────────────────────────────────────────────────────────

export const getPublishedPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
  },
});

export const getPublishedPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .filter((q) => q.eq(q.field("published"), true))
      .first();
  },
});

export const getLatestPosts = query({
  args: { count: v.number() },
  handler: async (ctx, { count }) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(count);
  },
});

// ── Admin queries ───────────────────────────────────────────────────────────

export const getAllPostsAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.query("posts").order("desc").collect();
  },
});

export const getPostByIdAdmin = query({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.get(id);
  },
});

// ── Admin mutations ─────────────────────────────────────────────────────────

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const now = Date.now();
    return await ctx.db.insert("posts", {
      ...args,
      publishedAt: args.published ? now : undefined,
      updatedAt: now,
      authorId: userId,
    });
  },
});

export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Post not found");
    const updates: Record<string, unknown> = { ...fields, updatedAt: Date.now() };
    if (fields.published && !existing.published) {
      updates.publishedAt = Date.now();
    }
    await ctx.db.patch(id, updates);
  },
});

export const togglePublished = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const post = await ctx.db.get(id);
    if (!post) throw new Error("Post not found");
    const now = Date.now();
    await ctx.db.patch(id, {
      published: !post.published,
      publishedAt: !post.published && !post.publishedAt ? now : post.publishedAt,
      updatedAt: now,
    });
  },
});

export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    await ctx.db.delete(id);
  },
});
