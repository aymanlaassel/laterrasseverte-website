"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/commander", label: "Commander" },
  { href: "/nous-trouver", label: "Nous Trouver" },
];

export function Nav() {
  const pathname = usePathname();
  const { count, openDrawer, state } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // condense nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // pulse the panier badge when an item is added
  useEffect(() => {
    if (state.pulse === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(t);
  }, [state.pulse]);

  // close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/85 backdrop-blur-md border-b border-[var(--color-moss)]/12 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <span className="diamond diamond-sm transition-transform group-hover:rotate-[135deg]" aria-hidden />
          <span
            className="display-script leading-none"
            style={{
              fontSize: scrolled ? "1.5rem" : "1.85rem",
              transition: "font-size 400ms ease",
            }}
          >
            La Terrasse Verte
          </span>
        </Link>

        {/* Center links (desktop) */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative caps-soft transition-colors ${
                  active
                    ? "text-[var(--color-moss-deep)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-moss-deep)]"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 diamond diamond-sm scale-75" aria-hidden />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={openDrawer}
            className={`relative caps-soft py-2 px-1 inline-flex items-center gap-2 transition-transform ${
              pulse ? "scale-110" : "scale-100"
            }`}
            aria-label={`Panier (${count})`}
          >
            <PanierGlyph />
            <span className="hidden sm:inline">Panier</span>
            <span
              className={`inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1.5 rounded-full font-mono text-[0.7rem] transition-all ${
                count > 0
                  ? "bg-[var(--color-moss)] text-[var(--color-cream)]"
                  : "bg-transparent text-[var(--color-ink-soft)]/60 border border-[var(--color-moss)]/25"
              }`}
            >
              {count}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden caps-soft"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className="md:hidden absolute left-0 right-0 top-full bg-[var(--color-cream)]/95 backdrop-blur-md border-b border-[var(--color-moss)]/15 py-8">
          <ul className="flex flex-col items-center gap-6 text-center">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`closer ${active ? "text-[var(--color-moss-deep)]" : "text-[var(--color-ink)]"}`}
                    style={{ fontSize: "1.6rem" }}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}

function PanierGlyph() {
  // a small leaf-and-cup glyph that mirrors the brand mark, not a generic shopping cart
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 9h13l-1.5 9.5a1.5 1.5 0 0 1-1.5 1.3H8a1.5 1.5 0 0 1-1.5-1.3L5 9Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      <path d="M12 13c1.5 0 3-1 3-3" stroke="var(--color-moss)" />
    </svg>
  );
}
