"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEME_KEY, setTheme, useTheme } from "@/lib/useTheme";
import AccountButton from "./AccountButton";

// Same glass bar as Trading Claude: wordmark, sections, light/dark switch.
// The name is a placeholder until the brand is chosen.
export default function TopBar() {
  const pathname = usePathname() ?? "/";

  // Scroll edge cue: the bar firms up once content slides underneath it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light/dark: until you pick one, follow the device setting as it changes.
  const theme = useTheme();
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(THEME_KEY);
      } catch {
        // storage blocked — treat as no choice made
      }
      if (!saved) document.documentElement.dataset.theme = e.matches ? "light" : "dark";
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const inSubject = (id: string) => pathname.startsWith(`/${id}`);

  return (
    <header className="topbar" data-scrolled={scrolled || undefined}>
      <div className="brand">
        <Link href="/" className="wordmark">
          Bac
        </Link>
        <span className="paper-badge">beta</span>
      </div>

      <nav className="nav" aria-label="Meniu">
        <Link href="/" className="nav-link" aria-current={pathname === "/" ? "page" : undefined}>
          Acasă
        </Link>
        <Link href="/matematica" className="nav-link" aria-current={inSubject("matematica") ? "page" : undefined}>
          Matematică
        </Link>
        <Link href="/romana" className="nav-link" aria-current={inSubject("romana") ? "page" : undefined}>
          Română
        </Link>
      </nav>

      <div className="topbar-right">
        <AccountButton />
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Temă întunecată" : "Temă luminoasă"}
          title={theme === "light" ? "Temă întunecată" : "Temă luminoasă"}
        >
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
          </svg>
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
