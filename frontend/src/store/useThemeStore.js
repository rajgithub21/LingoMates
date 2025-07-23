import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("current-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("current-theme",theme)
    set({ theme });
  },
}));
