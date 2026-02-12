import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("locations").collect();
  },
});

export const getByState = query({
  args: { state: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("locations")
      .withIndex("by_state", (q) => q.eq("state", args.state))
      .collect();
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("locations").first();
    if (existing) return "already seeded";

    const locations = [
      { name: "Buc-ee's New Braunfels", address: "2760 IH-35 N", city: "New Braunfels", state: "TX", lat: 29.7189, lng: -98.1245 },
      { name: "Buc-ee's Luling", address: "10070 US-183", city: "Luling", state: "TX", lat: 29.6819, lng: -97.6478 },
      { name: "Buc-ee's Madisonville", address: "205 IH-45 S", city: "Madisonville", state: "TX", lat: 30.9571, lng: -95.9116 },
      { name: "Buc-ee's Texas City", address: "6201 Gulf Fwy", city: "Texas City", state: "TX", lat: 29.3969, lng: -94.9386 },
      { name: "Buc-ee's Terrell", address: "301 IH-20", city: "Terrell", state: "TX", lat: 32.7357, lng: -96.2754 },
      { name: "Buc-ee's Denton", address: "2800 S Loop 288", city: "Denton", state: "TX", lat: 33.1870, lng: -97.1234 },
      { name: "Buc-ee's Royse City", address: "551 IH-30", city: "Royse City", state: "TX", lat: 32.9756, lng: -96.3321 },
      { name: "Buc-ee's Fort Worth", address: "15901 N Fwy", city: "Fort Worth", state: "TX", lat: 32.8998, lng: -97.3208 },
      { name: "Buc-ee's Baytown", address: "4080 E Fwy", city: "Baytown", state: "TX", lat: 29.7531, lng: -94.9469 },
      { name: "Buc-ee's Waller", address: "27106 US-290", city: "Waller", state: "TX", lat: 30.0566, lng: -95.9267 },
      { name: "Buc-ee's Bastrop", address: "1700 TX-71", city: "Bastrop", state: "TX", lat: 30.1102, lng: -97.3100 },
      { name: "Buc-ee's Temple", address: "4155 N Gen Bruce Dr", city: "Temple", state: "TX", lat: 31.1171, lng: -97.3428 },
      { name: "Buc-ee's Melissa", address: "1550 Central Expy", city: "Melissa", state: "TX", lat: 33.2862, lng: -96.5728 },
      { name: "Buc-ee's Alabama (Leeds)", address: "6900 Buc-ee's Blvd", city: "Leeds", state: "AL", lat: 33.5451, lng: -86.5447 },
      { name: "Buc-ee's Daytona Beach", address: "2330 Gateway North Dr", city: "Daytona Beach", state: "FL", lat: 29.2108, lng: -81.0734 },
      { name: "Buc-ee's St. Augustine", address: "200 World Commerce Pkwy", city: "St. Augustine", state: "FL", lat: 29.9414, lng: -81.4328 },
      { name: "Buc-ee's Florence", address: "3390 S Irby St", city: "Florence", state: "SC", lat: 34.1540, lng: -79.7898 },
      { name: "Buc-ee's Warner Robins", address: "7001 Russell Pkwy", city: "Warner Robins", state: "GA", lat: 32.5819, lng: -83.6688 },
      { name: "Buc-ee's Sevierville", address: "225 Collier Dr", city: "Sevierville", state: "TN", lat: 35.8681, lng: -83.5610 },
      { name: "Buc-ee's Richmond", address: "6424 Lickinghole Rd", city: "Richmond", state: "KY", lat: 37.7483, lng: -84.2947 },
      { name: "Buc-ee's Crossville", address: "2045 Genesis Rd", city: "Crossville", state: "TN", lat: 35.9490, lng: -85.0269 },
      { name: "Buc-ee's Springfield", address: "2015 International Blvd", city: "Springfield", state: "MO", lat: 37.2090, lng: -93.2923 },
      { name: "Buc-ee's Johnstown", address: "164 Almeda Dr", city: "Johnstown", state: "CO", lat: 40.3528, lng: -104.9414 },
      { name: "Buc-ee's Hillsboro", address: "100 NE Buc-ee's Blvd", city: "Hillsboro", state: "TX", lat: 32.0104, lng: -97.1297 },
    ];

    for (const loc of locations) {
      await ctx.db.insert("locations", { ...loc, totalCheckins: 0 });
    }
    return `seeded ${locations.length} locations`;
  },
});
