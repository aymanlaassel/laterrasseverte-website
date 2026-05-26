"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { itemById, formatPrice, priceToNumber } from "@/lib/menu";

export function CartDrawer() {
  const { isOpen, closeDrawer, state, setQty, remove, total, clear } = useCart();

  // lock body scroll while open + close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--color-ink)]/40 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-[100dvh] w-full max-w-[440px] bg-[var(--color-cream)] shadow-2xl border-l border-[var(--color-moss)]/15 transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Panier"
        aria-hidden={!isOpen}
      >
        <div className="px-8 pt-10 pb-6 border-b border-[var(--color-moss)]/15 flex items-baseline justify-between">
          <div>
            <span className="diamond diamond-sm" aria-hidden />
            <p className="section-kicker mt-3">Votre commande</p>
            <h2
              className="section-title mt-2"
              style={{ fontSize: "2rem" }}
            >
              Panier
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="caps-soft hover:text-[var(--color-moss-deep)] transition-colors"
            aria-label="Fermer le panier"
          >
            Fermer ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {state.lines.length === 0 ? (
            <div className="text-center py-16">
              <p className="closer text-2xl">Votre panier est vide</p>
              <p className="mt-3 italic text-[var(--color-ink-soft)]">
                Choisissez quelques plats pour commencer.
              </p>
              <Link
                href="/menu"
                onClick={closeDrawer}
                className="caps-soft mt-8 inline-flex items-center gap-3 group"
              >
                <span className="h-px w-6 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-10" />
                Voir le menu
                <span className="h-px w-6 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-10" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {state.lines.map((line) => {
                const item = itemById.get(line.id);
                if (!item) return null;
                return (
                  <li key={line.id} className="pb-5 border-b border-[var(--color-moss)]/10 last:border-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-serif font-semibold text-[1.05rem] leading-tight">
                          {item.name}
                        </p>
                        <p className="caps-soft mt-1" style={{ fontSize: "0.65rem" }}>
                          {item.sectionTitle}
                        </p>
                      </div>
                      <p className="font-serif font-bold text-[var(--color-moss-deep)] whitespace-nowrap">
                        {priceToNumber(item.price) * line.qty} DH
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyStepper
                        qty={line.qty}
                        onChange={(q) => setQty(line.id, q)}
                      />
                      <button
                        onClick={() => remove(line.id)}
                        className="caps-soft text-[var(--color-ink-soft)] hover:text-[var(--color-moss-deep)] transition-colors"
                        style={{ fontSize: "0.65rem" }}
                      >
                        Retirer
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {state.lines.length > 0 && (
          <div className="border-t border-[var(--color-moss)]/15 px-8 pt-6 pb-10 bg-[var(--color-paper-soft)]">
            <div className="flex items-baseline justify-between mb-6">
              <span className="caps">Total</span>
              <span
                className="font-serif font-bold text-[var(--color-moss-deep)]"
                style={{ fontSize: "1.6rem" }}
              >
                {total} DH
              </span>
            </div>
            <Link
              href="/commander"
              onClick={closeDrawer}
              className="block w-full text-center py-4 bg-[var(--color-moss-deep)] text-[var(--color-cream)] caps tracking-[0.3em] hover:bg-[var(--color-moss)] transition-colors"
              style={{ color: "var(--color-cream)" }}
            >
              Passer commande
            </Link>
            <button
              onClick={() => {
                if (confirm("Vider le panier ?")) clear();
              }}
              className="mt-3 w-full text-center caps-soft text-[var(--color-ink-soft)] hover:text-[var(--color-moss-deep)] transition-colors"
            >
              Vider le panier
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export function QtyStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-[var(--color-moss)]/25 rounded-sm">
      <button
        onClick={() => onChange(qty - 1)}
        className="px-3 py-1 text-[var(--color-moss-deep)] hover:bg-[var(--color-moss)]/8 transition-colors"
        aria-label="Diminuer"
      >
        −
      </button>
      <span className="font-mono px-3 min-w-[2.2rem] text-center text-[0.9rem]">{qty}</span>
      <button
        onClick={() => onChange(qty + 1)}
        className="px-3 py-1 text-[var(--color-moss-deep)] hover:bg-[var(--color-moss)]/8 transition-colors"
        aria-label="Augmenter"
      >
        +
      </button>
    </div>
  );
}
