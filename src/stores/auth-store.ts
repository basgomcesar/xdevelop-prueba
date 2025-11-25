import { create } from "zustand";
import { setCookie, deleteCookie } from "cookies-next";

interface AuthState {
  token: string | null;
  role: "admin" | "user" | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,

  login: (token: string) => {
    setCookie("accessToken", token, {
      maxAge: 60 * 60,
      sameSite: "lax",
    });

    setCookie("refreshToken", "dummy-refresh-token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    set({ token, role: "admin" }); 
  },

  logout: () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    set({ token: null, role: null });
  },
}));