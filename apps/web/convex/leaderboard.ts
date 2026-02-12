import { v } from "convex/values";

import { query } from "./_generated/server";

export const top = query({
  args: { limit: v.optional(v.float64()) },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(100, Math.floor(args.limit ?? 25)));

    const rows = await ctx.db
      .query("leaderboard")
      .withIndex("by_total_visits")
      .order("desc")
      .take(limit);

    return rows.map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));
  },
});
