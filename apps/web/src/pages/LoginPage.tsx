export function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Sign in</h2>
      <p className="text-sm text-zinc-700">Use your Buc-ee&apos;s Tracker account.</p>
      <form className="space-y-3">
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
          placeholder="Username"
          type="text"
        />
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
          placeholder="Password"
          type="password"
        />
        <button
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
}
