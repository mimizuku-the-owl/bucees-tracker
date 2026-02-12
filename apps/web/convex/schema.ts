import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    displayName: v.string(),
    createdAt: v.float64(),
  }).index("by_username", ["username"]),

  locations: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    lat: v.float64(),
    lng: v.float64(),
    totalCheckins: v.float64(),
  }).index("by_state", ["state"]),

  visits: defineTable({
    userId: v.id("users"),
    locationId: v.id("locations"),
    visitedAt: v.float64(),
    rating: v.optional(v.float64()),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_location", ["locationId"]),

  leaderboard: defineTable({
    userId: v.id("users"),
    displayName: v.string(),
    totalVisits: v.float64(),
    uniqueLocations: v.float64(),
  }).index("by_total_visits", ["totalVisits"]),
});
