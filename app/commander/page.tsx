"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { itemById, priceToNumber, contact, glovoUrl } from "@/lib/menu";
import { QtyStepper } from "@/components/CartDrawer";

export default function CommanderPage() {
  const { state, setQty, remove, total, count, clear } = useCart();

  return (
    <main className="relative z-10">
      <section className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 pt-16 pb-12 text-center">
        <span className="diamond" aria-hidden />
        <p className="section-kicker mt-6">Votre commande</p>
        <h1 className="section-title mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          Commander
        </h1>
      </section>

      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 pb-32 grid lg:grid-cols-[1.5fr_1fr] gap-x-16 gap-y-16">
        {/* Cart */}
        <div>
          <div className="flex items-baseline justify-between border-b border-[var(--color-moss)]/15 pb-4 mb-6">
            <h2 className="closer text-2xl">Votre panier</h2>
            <p className="caps-soft">
              {count} article{count > 1 ? "s" : ""}
            </p>
          </div>

          {state.lines.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <ul className="space-y-6">
                {state.lines.map((line) => {
                  const item = itemById.get(line.id);
                  if (!item) return null;
                  return (
                    <li
                      key={line.id}
                      className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 pb-6 border-b border-[var(--color-moss)]/10"
                    >
                      <div>
                        <p className="caps-soft" style={{ fontSize: "0.65rem" }}>
                          {item.sectionTitle}
                          {item.groupHeading && ` · ${item.groupHeading}`}
                        </p>
                        <p
                          className="font-serif font-semibold mt-1 leading-tight"
                          style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)" }}
                        >
                          {item.name}
                        </p>
                        {item.desc && (
                          <p className="italic text-[var(--color-ink-soft)] text-[0.9rem] mt-1 max-w-md">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p
                          className="font-serif font-bold text-[var(--color-moss-deep)]"
                          style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
                        >
                          {priceToNumber(item.price) * line.qty} DH
                        </p>
                        <p className="caps-soft mt-1" style={{ fontSize: "0.6rem" }}>
                          {priceToNumber(item.price)} DH × {line.qty}
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center justify-between mt-2">
                        <QtyStepper qty={line.qty} onChange={(q) => setQty(line.id, q)} />
                        <button
                          onClick={() => remove(line.id)}
                          className="caps-soft text-[var(--color-ink-soft)] hover:text-[var(--color-moss-deep)] transition-colors"
                        >
                          Retirer
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 flex items-baseline justify-between border-t border-[var(--color-moss)]/15 pt-6">
                <span className="caps">Total</span>
                <span
                  className="font-serif font-bold text-[var(--color-moss-deep)]"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
                >
                  {total} DH
                </span>
              </div>

              <button
                onClick={() => {
                  if (confirm("Vider le panier ?")) clear();
                }}
                className="caps-soft mt-6 text-[var(--color-ink-soft)] hover:text-[var(--color-moss-deep)] transition-colors"
              >
                Vider le panier
              </button>
            </>
          )}
        </div>

        {/* Channels */}
        <aside>
          <div className="lg:sticky lg:top-32 space-y-10">
            <div>
              <p className="section-kicker">Comment commander</p>
              <h2
                className="section-title mt-2"
                style={{ fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }}
              >
                Trois façons
              </h2>
              <p className="mt-4 italic text-[var(--color-ink-soft)] leading-relaxed">
                Choisissez la formule qui vous convient. Pour à emporter et sur place,
                appelez-nous avec votre panier en main.
              </p>
            </div>

            <Channel
              number="01"
              title="À emporter"
              body="Composez votre panier, puis appelez pour confirmer la commande et l'heure de retrait."
              cta="Appeler pour commander"
              href={`tel:${contact.phone[0].replace(/\s/g, "")}`}
              dim
              note={`Disponible pendant les heures d'ouverture · ${contact.hours}`}
            />

            <Channel
              number="02"
              title="Sur place"
              body="Préférez-vous dîner en terrasse ? Réservez votre table par téléphone."
              cta="Réserver une table"
              href={`tel:${contact.phone[1].replace(/\s/g, "")}`}
            />

            <Channel
              number="03"
              title="En livraison"
              body="Notre carte est également servie sur Glovo, livrée à votre porte."
              cta="Commander sur Glovo"
              href={glovoUrl}
              external
            />
          </div>
        </aside>
      </div>
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="py-16 text-center frame">
      <p className="closer text-2xl">Votre panier est vide</p>
      <p className="mt-4 italic text-[var(--color-ink-soft)] max-w-sm mx-auto">
        Parcourez notre carte et ajoutez des plats à votre panier pour passer commande.
      </p>
      <Link
        href="/menu"
        className="mt-8 inline-block caps tracking-[0.3em] px-7 py-3 bg-[var(--color-moss-deep)] text-[var(--color-cream)] hover:bg-[var(--color-moss)] transition-colors"
        style={{ color: "var(--color-cream)" }}
      >
        Voir le menu
      </Link>
    </div>
  );
}

function Channel({
  number,
  title,
  body,
  cta,
  href,
  external,
  dim,
  note,
}: {
  number: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
  dim?: boolean;
  note?: string;
}) {
  return (
    <div className="frame p-6">
      <div className="flex items-baseline gap-4">
        <p className="font-mono text-[0.7rem] text-[var(--color-moss)] tracking-[0.25em]">
          {number}
        </p>
        <h3 className="closer text-2xl">{title}</h3>
      </div>
      <p className="mt-3 italic text-[var(--color-ink-soft)] leading-relaxed">{body}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`mt-5 inline-flex items-center gap-3 caps tracking-[0.25em] py-2.5 px-5 transition-colors ${
          dim
            ? "border border-[var(--color-moss-deep)] text-[var(--color-moss-deep)] hover:bg-[var(--color-moss-deep)] hover:text-[var(--color-cream)]"
            : "bg-[var(--color-moss-deep)] text-[var(--color-cream)] hover:bg-[var(--color-moss)]"
        }`}
        style={!dim ? { color: "var(--color-cream)" } : undefined}
      >
        {cta} {external ? "↗" : "→"}
      </a>
      {note && <p className="mt-4 caps-soft" style={{ fontSize: "0.6rem" }}>{note}</p>}
    </div>
  );
}
