"use client";

import { useEffect, useState } from "react";
import { currentTheme, type Theme } from "./theme";

export const THEME_KEY = "siteTheme";

/** The active theme, updated whenever <html data-theme> changes. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const read = () => setTheme(currentTheme());
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return theme;
}

/** Switch theme and remember the choice (same key as serban-photo.com). */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // private mode — the choice just won't be remembered
  }
}
