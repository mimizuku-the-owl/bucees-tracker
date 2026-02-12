import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const register = mutation({
  args: {
    username: v.string(),
    displayName: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    if (existing) {
      throw new Error("Username already taken");
    }
    // Simple hash — NOT production-grade, just for fun tracker
    const passwordHash = btoa(args.password);
    const userId = await ctx.db.insert("users", {
      username: args.username,
      displayName: args.displayName,
      passwordHash,
      createdAt: Date.now(),
    });
    return userId;
  },
});

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    if (!user || user.passwordHash !== btoa(args.password)) {
      throw new Error("Invalid username or password");
    }
    return { _id: user._id, username: user.username, displayName: user.displayName };
  },
});

export const me = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    return ctx.db.get(args.userId);
  },
});
