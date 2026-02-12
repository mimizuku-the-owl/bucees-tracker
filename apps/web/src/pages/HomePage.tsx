import { useState } from "react";

export function HomePage() {
  const [notes, setNotes] = useState("");

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Check in at Buc-ee&apos;s</h2>
      <p className="text-sm text-zinc-700">
        Track your stops, leave notes, and watch your ranking move in real time.
      </p>
      <div className="grid gap-3 rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
        <input
          className="rounded-lg border border-zinc-300 px-3 py-2"
          placeholder="Location name (e.g. New Braunfels)"
        />
        <textarea
          className="min-h-24 rounded-lg border border-zinc-300 px-3 py-2"
          placeholder="Road trip notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <button
          className="w-fit rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          type="button"
        >
          Check in
        </button>
      </div>
    </section>
  );
}
