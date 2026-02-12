import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../hooks/useAuth";
import type { Id } from "../../convex/_generated/dataModel";

export function HomePage() {
  const { user } = useAuth();
  const locations = useQuery(api.locations.list);
  const checkIn = useMutation(api.visits.checkIn);
  const seedLocations = useMutation(api.locations.seed);

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [status, setStatus] = useState<string>("");

  const handleSeed = async () => {
    const result = await seedLocations();
    setStatus(String(result));
  };

  const handleCheckIn = async () => {
    if (!user || !selectedLocation) return;
    setStatus("Checking in…");
    try {
      await checkIn({
        userId: user._id,
        locationId: selectedLocation as Id<"locations">,
        rating,
        notes: notes || undefined,
      });
      setStatus("✅ Checked in!");
      setNotes("");
      setSelectedLocation("");
    } catch (err: unknown) {
      setStatus(err instanceof Error ? `❌ ${err.message}` : "❌ Failed");
    }
  };

  if (!user) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Buc-ee&apos;s Tracker 🦫</h2>
        <p className="text-zinc-700">
          Track every Buc-ee&apos;s pit stop, compete on the leaderboard, and prove you&apos;re the ultimate road tripper.
        </p>
        <div className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-600">
            <a href="/login" className="font-semibold text-amber-700 underline">Sign in</a> or{" "}
            <a href="/login" className="font-semibold text-amber-700 underline">create an account</a> to start checking in!
          </p>
        </div>
        {locations && locations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">📍 {locations.length} Locations</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {locations.slice(0, 8).map((loc) => (
                <div key={loc._id} className="rounded-lg border border-amber-100 bg-white px-3 py-2 text-sm">
                  <span className="font-medium">{loc.name}</span>
                  <span className="text-zinc-500"> — {loc.city}, {loc.state}</span>
                </div>
              ))}
            </div>
            {locations.length > 8 && (
              <p className="text-xs text-zinc-400">and {locations.length - 8} more…</p>
            )}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Check in at Buc-ee&apos;s</h2>
      <p className="text-sm text-zinc-700">
        Hey <strong>{user.displayName}</strong> — pick a location and leave your mark! 🦫
      </p>

      {(!locations || locations.length === 0) && (
        <button
          onClick={handleSeed}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          🌱 Seed Buc-ee&apos;s Locations
        </button>
      )}

      {locations && locations.length > 0 && (
        <div className="grid gap-3 rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
          <select
            className="rounded-lg border border-zinc-300 px-3 py-2"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select a location…</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name} — {loc.city}, {loc.state}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-zinc-700">Rating:</label>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`text-xl ${n <= rating ? "text-amber-500" : "text-zinc-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="min-h-20 rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="Road trip notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            onClick={handleCheckIn}
            disabled={!selectedLocation}
            className="w-fit rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            🦫 Check In
          </button>
        </div>
      )}

      {status && <p className="text-sm text-zinc-600">{status}</p>}
    </section>
  );
}
