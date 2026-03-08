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
