"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { menu, getAllItems, type FlatItem, type MenuSection } from "@/lib/menu";
import { MenuItemRow } from "@/components/MenuItemRow";

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(menu[0]!.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const trimmed = query.trim().toLowerCase();
  const filteredItems = useMemo<FlatItem[] | null>(() => {
    if (!trimmed) return null;
    return getAllItems().filter((i) =>
      [i.name, i.desc ?? "", i.sectionTitle]
        .join(" ")
        .toLowerCase()
        .includes(trimmed)
    );
  }, [trimmed]);

  // scroll spy
  useEffect(() => {
    if (filteredItems) return; // disable spy while searching
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filteredItems]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main className="relative z-10">
      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 pt-16 pb-12 text-center">
        <span className="diamond" aria-hidden />
        <p className="section-kicker mt-6">La Carte</p>
        <h1 className="section-title mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          Menu
        </h1>
        <p className="mt-6 italic text-[var(--color-ink-soft)]">
          Servi de 7h00 à 23h00, sans interruption.
        </p>

        {/* Search */}
        <div className="mt-10 max-w-md mx-auto">
          <label className="relative block">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat, un café, une crêpe…"
              className="w-full bg-transparent border-b border-[var(--color-moss)]/30 focus:border-[var(--color-moss-deep)] outline-none text-center italic text-[var(--color-ink)] py-3 placeholder:text-[var(--color-ink-soft)]/60 transition-colors"
              aria-label="Rechercher un plat"
            />
          </label>
        </div>
      </section>

      {/* Sticky category nav (hidden when searching) */}
      {!filteredItems && (
        <nav
          className="sticky top-[68px] sm:top-[76px] z-30 bg-[var(--color-cream)]/85 backdrop-blur-md border-y border-[var(--color-moss)]/15"
          aria-label="Catégories"
        >
          <ul className="mx-auto max-w-[1180px] flex gap-1 overflow-x-auto px-4 sm:px-10 lg:px-16 py-3 scrollbar-none">
            {menu.map((s) => {
              const active = activeId === s.id;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={`px-4 py-2 caps-soft transition-colors whitespace-nowrap ${
                      active
                        ? "text-[var(--color-moss-deep)]"
                        : "text-[var(--color-ink-soft)] hover:text-[var(--color-moss-deep)]"
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Body */}
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 pb-32">
        {filteredItems ? (
          <SearchResults items={filteredItems} query={query} />
        ) : (
          menu.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              registerRef={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            />
          ))
        )}
      </div>
    </main>
  );
}

function SectionBlock({
  section,
  registerRef,
}: {
  section: MenuSection;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const isTwoCol = section.groups.length === 2;
  return (
    <section
      id={section.id}
      ref={registerRef}
      className="py-20 sm:py-28 border-t border-[var(--color-moss)]/15 first:border-t-0 scroll-mt-32"
    >
      <header className="text-center mb-14">
        <span className="diamond" aria-hidden />
        {section.kicker && <p className="section-kicker mt-6">{section.kicker}</p>}
        <h2 className="section-title mt-3" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
          {section.title}
        </h2>
        {section.intro && (
          <div className="mx-auto mt-8 max-w-2xl frame px-6 py-5 text-center">
            <p className="italic text-[var(--color-ink-soft)] leading-relaxed">
              {section.intro}
            </p>
          </div>
        )}
      </header>

      <div
        className={
          isTwoCol
            ? "grid gap-x-16 gap-y-12 sm:grid-cols-2 max-w-[1100px] mx-auto"
            : "max-w-[820px] mx-auto"
        }
      >
        {section.groups.map((group, gi) => {
          const items = group.items.map((item) => ({
            ...item,
            id: `${section.id}--${slug(item.name)}${group.heading ? "--" + slug(group.heading) : ""}`,
            sectionId: section.id,
            sectionTitle: section.title,
            groupHeading: group.heading,
          })) as FlatItem[];
          return (
            <div key={gi}>
              {group.heading && (
                <h3 className="closer text-2xl mb-6 flex items-baseline gap-3">
                  <span className="caps-soft" style={{ fontSize: "0.6rem" }}>
                    {section.title}
                  </span>
                  {group.heading}
                </h3>
              )}
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <MenuItemRow key={item.id} item={item} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {section.note && (
        <div className="mx-auto mt-12 max-w-2xl frame px-6 py-5 text-center">
          <p className="italic text-[var(--color-ink-soft)] leading-relaxed">{section.note}</p>
        </div>
      )}
    </section>
  );
}

function SearchResults({ items, query }: { items: FlatItem[]; query: string }) {
  return (
    <section className="py-12">
      <p className="caps-soft mb-8 text-center">
        {items.length} résultat{items.length === 1 ? "" : "s"} pour « {query} »
      </p>
      {items.length === 0 ? (
        <p className="closer text-center text-2xl mt-12 text-[var(--color-ink-soft)]">
          Rien trouvé. Essayez un autre mot.
        </p>
      ) : (
        <ul className="max-w-[820px] mx-auto space-y-1.5">
          {items.map((item) => (
            <MenuItemRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
}

// inline slugify (kept local to avoid import; mirrors lib/menu.ts behavior)
function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
