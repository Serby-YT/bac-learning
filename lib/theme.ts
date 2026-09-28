export type Theme = "dark" | "light";

/** The theme currently on <html data-theme>, set by the inline script in app/layout.tsx. */
export function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
