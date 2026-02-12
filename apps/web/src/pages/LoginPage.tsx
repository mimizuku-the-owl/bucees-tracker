import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { user, login, register, logout } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return (
      <section className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Welcome back, {user.displayName}!</h2>
        <p className="text-sm text-zinc-600">Logged in as <strong>{user.username}</strong></p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Check In
          </button>
          <button
            onClick={logout}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Logout
          </button>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register(username, displayName || username, password);
      }
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">{mode === "login" ? "Sign in" : "Create Account"}</h2>
      <p className="text-sm text-zinc-700">
        {mode === "login" ? "Use your Buc-ee's Tracker account." : "Join the Buc-ee's adventure!"}
      </p>
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {mode === "register" && (
          <input
            className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="Display Name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}
        <input
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          type="submit"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="text-sm text-amber-700 underline"
      >
        {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </section>
  );
}
