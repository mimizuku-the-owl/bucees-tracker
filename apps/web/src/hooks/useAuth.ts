import { useMutation } from "convex/react";
import { useState, useCallback } from "react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

type User = { _id: Id<"users">; username: string; displayName: string };

const STORAGE_KEY = "bucees-user";

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(loadUser);
  const loginMut = useMutation(api.auth.login);
  const registerMut = useMutation(api.auth.register);

  const login = useCallback(
    async (username: string, password: string) => {
      const u = await loginMut({ username, password }) as unknown as User;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setUser(u);
      return u;
    },
    [loginMut],
  );

  const register = useCallback(
    async (username: string, displayName: string, password: string) => {
      const userId = await registerMut({ username, displayName, password });
      const u: User = { _id: userId, username, displayName };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setUser(u);
      return u;
    },
    [registerMut],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, login, register, logout };
}
