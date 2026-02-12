# bucees-tracker BUILD PLAN

**DO NOT REWRITE THIS. EXECUTE IT.**

## Convex Details
- URL: `https://dynamic-cow-205.convex.cloud`
- Put in `apps/web/.env.local` as `VITE_CONVEX_URL`

## Steps (commit after each)

### 1. Restructure repo
- Move to `apps/web/` structure
- Root package.json: workspaces `["apps/*"]`
- `apps/web/package.json`: vite, react 19, react-dom, convex, react-router-dom, tailwindcss v4

### 2. Convex schema (`apps/web/convex/schema.ts`)
```ts
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
  }).index("by_user", ["userId"]).index("by_location", ["locationId"]),

  leaderboard: defineTable({
    userId: v.id("users"),
    displayName: v.string(),
    totalVisits: v.float64(),
    uniqueLocations: v.float64(),
  }).index("by_total_visits", ["totalVisits"]),
});
```

### 3. Convex functions
- `apps/web/convex/visits.ts` — `checkIn` mutation, `recentByLocation` query
- `apps/web/convex/leaderboard.ts` — `top` query
- `apps/web/convex/auth.ts` — `signUp` mutation, `signIn` mutation (bcrypt hash)
- `apps/web/convex/locations.ts` — `list` query, `seed` mutation

### 4. React app
- `apps/web/src/main.tsx` — ConvexProvider + BrowserRouter
- `apps/web/src/App.tsx` — Routes: /, /leaderboard, /login
- `apps/web/src/pages/Home.tsx` — Location list with check-in buttons
- `apps/web/src/pages/Leaderboard.tsx` — `useQuery(api.leaderboard.top)`
- `apps/web/src/pages/Login.tsx` — Username/password form

### 5. Config files
- `apps/web/index.html`
- `apps/web/vite.config.ts`
- `apps/web/.env.local` — `VITE_CONVEX_URL=https://dynamic-cow-205.convex.cloud`
- `apps/web/src/styles/app.css` — `@import "tailwindcss"`

### 6. Install + test
- `cd apps/web && bun install`
- `npx convex dev` (deploys schema)
- `bun run dev` (starts Vite)
