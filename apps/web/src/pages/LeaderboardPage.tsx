const demoRows = [
  { rank: 1, displayName: "BuckyHunter", totalVisits: 42, uniqueLocations: 18 },
  { rank: 2, displayName: "RoadSnacker", totalVisits: 33, uniqueLocations: 14 },
  { rank: 3, displayName: "BeaverScout", totalVisits: 29, uniqueLocations: 12 },
];

export function LeaderboardPage() {
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
            {demoRows.map((row) => (
              <tr className="border-t border-zinc-100" key={row.rank}>
                <td className="px-4 py-3 font-semibold">#{row.rank}</td>
                <td className="px-4 py-3">{row.displayName}</td>
                <td className="px-4 py-3">{row.totalVisits}</td>
                <td className="px-4 py-3">{row.uniqueLocations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
