import { type ReactNode } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LoginPage } from "./pages/LoginPage";

const Shell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-amber-50 text-zinc-900">
    <header className="border-b border-amber-200 bg-white/70 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <h1 className="text-xl font-semibold">Buc-ee&apos;s Tracker</h1>
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
    <main className="mx-auto w-full max-w-5xl p-6">{children}</main>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell><HomePage /></Shell>} />
      <Route path="/leaderboard" element={<Shell><LeaderboardPage /></Shell>} />
      <Route path="/login" element={<Shell><LoginPage /></Shell>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
