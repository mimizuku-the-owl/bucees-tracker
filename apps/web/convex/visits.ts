import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const checkIn = mutation({
  args: {
    userId: v.id("users"),
    locationId: v.id("locations"),
    rating: v.optional(v.float64()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const visitedAt = Date.now();

    const visitId = await ctx.db.insert("visits", {
      userId: args.userId,
      locationId: args.locationId,
      visitedAt,
      rating: args.rating,
      notes: args.notes,
    });

    const location = await ctx.db.get(args.locationId);
    if (location) {
      await ctx.db.patch(args.locationId, {
        totalCheckins: (location.totalCheckins ?? 0) + 1,
      });
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      return { visitId };
    }

    const userVisits = await ctx.db
      .query("visits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const uniqueLocationIds = new Set(
      userVisits.map((visit) => visit.locationId.toString()),
    );

    const existingLeaderboard = await ctx.db
      .query("leaderboard")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    const payload = {
      userId: args.userId,
      displayName: user.displayName,
      totalVisits: userVisits.length,
      uniqueLocations: uniqueLocationIds.size,
    };

    if (existingLeaderboard) {
      await ctx.db.patch(existingLeaderboard._id, payload);
    } else {
      await ctx.db.insert("leaderboard", payload);
    }

    return { visitId };
  },
});

export const recentByUser = query({
  args: { userId: v.id("users"), limit: v.optional(v.float64()) },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(50, Math.floor(args.limit ?? 20)));

    const visits = await ctx.db
      .query("visits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);

    return Promise.all(
      visits.map(async (visit) => ({
        ...visit,
        location: await ctx.db.get(visit.locationId),
      })),
    );
  },
});

export const recentByLocation = query({
  args: { locationId: v.id("locations"), limit: v.optional(v.float64()) },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(50, Math.floor(args.limit ?? 20)));

    return ctx.db
      .query("visits")
      .withIndex("by_location", (q) => q.eq("locationId", args.locationId))
      .order("desc")
      .take(limit);
  },
});
