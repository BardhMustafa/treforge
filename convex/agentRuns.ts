import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAgentRuns = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.query("agentRuns").order("desc").take(50);
  },
});
