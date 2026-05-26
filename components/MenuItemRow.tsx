"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, type FlatItem } from "@/lib/menu";

export function MenuItemRow({ item }: { item: FlatItem }) {
  const { add, openDrawer } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const onAdd = () => {
    add(item.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 700);
  };

  return (
    <li className="group menu-row px-3 -mx-3 py-2.5 flex items-baseline gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <p className="font-serif font-semibold text-[1.08rem] sm:text-[1.15rem] text-[var(--color-ink)]">
            {item.name}
            {item.badge && <span className="pill">{item.badge}</span>}
          </p>
          <span className="leader" aria-hidden />
          <p className="font-serif font-bold text-[1.05rem] sm:text-[1.1rem] text-[var(--color-moss-deep)] whitespace-nowrap">
            {formatPrice(item.price)}
          </p>
        </div>
        {item.desc && (
          <p className="italic text-[0.95rem] leading-snug text-[var(--color-ink-soft)] mt-1 pr-4">
            {item.desc}
          </p>
        )}
        {item.note && (
          <p className="italic text-[0.85rem] text-[var(--color-moss)]/80 mt-1">
            {item.note}
          </p>
        )}
      </div>
      <button
        onClick={onAdd}
        aria-label={`Ajouter ${item.name}`}
        className={`shrink-0 ml-2 w-9 h-9 inline-flex items-center justify-center rounded-full border transition-all ${
          justAdded
            ? "bg-[var(--color-moss-deep)] border-[var(--color-moss-deep)] text-[var(--color-cream)] scale-110"
            : "border-[var(--color-moss)]/35 text-[var(--color-moss-deep)] hover:bg-[var(--color-moss-deep)] hover:text-[var(--color-cream)] hover:border-[var(--color-moss-deep)] opacity-60 sm:opacity-0 sm:group-hover:opacity-100"
        }`}
      >
        {justAdded ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7l3.5 3.5L12 4" />
          </svg>
        ) : (
          <span className="text-xl leading-none translate-y-[-1px]">+</span>
        )}
      </button>
    </li>
  );
}
