import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function LeaderboardPage() {
  const rows = useQuery(api.leaderboard.top, { limit: 25 });

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <p className="text-sm text-zinc-700">Top travelers by total Buc-ee&apos;s check-ins.</p>
      <div className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-amber-100/70 text-zinc-800">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Traveler</th>
              <th className="px-4 py-3">Total Visits</th>
              <th className="px-4 py-3">Unique Locations</th>
            </tr>
          </thead>
          <tbody>
            {rows === undefined ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-zinc-400">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-zinc-400">
                  No check-ins yet. Be the first! 🦫
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr className="border-t border-zinc-100" key={row._id}>
                  <td className="px-4 py-3 font-semibold">#{row.rank}</td>
                  <td className="px-4 py-3">{row.displayName}</td>
                  <td className="px-4 py-3">{row.totalVisits}</td>
                  <td className="px-4 py-3">{row.uniqueLocations}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
