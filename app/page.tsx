import Link from "next/link";
import { contact, itemById, specials } from "@/lib/menu";

const signatureIds = [
  "petits-dejeuners--berbere",
  "mqilat--mqila-fruits-de-mer",
  "salades--salade-avocat-poulet",
  "plats-maison--rfissa",
  "pizzas--fruits-de-mer",
  "crepes--nutella--sucrees",
];

export default function Home() {
  const signatures = signatureIds
    .map((id) => itemById.get(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof itemById.get>>[];

  return (
    <main className="relative z-10 overflow-x-hidden">
      <Cover />
      <Prologue />
      <Signatures items={signatures} />
      <SpecialsInset />
      <Pillars />
      <Closer />
    </main>
  );
}

/* ─────────────────────────  COVER  ───────────────────────── */

function Cover() {
  return (
    <section className="relative min-h-[88svh] flex flex-col items-center justify-center px-6 py-20 text-center -mt-20 sm:-mt-24">
      <span className="sparkle sparkle-anim absolute left-8 top-24 text-xl">✦</span>
      <span className="sparkle sparkle-anim absolute right-8 top-24 text-xl" style={{ animationDelay: "1.2s" }}>✦</span>
      <span className="sparkle sparkle-anim absolute left-10 bottom-10 text-base" style={{ animationDelay: "2s" }}>✦</span>
      <span className="sparkle sparkle-anim absolute right-10 bottom-10 text-base" style={{ animationDelay: "0.7s" }}>✦</span>

      <div className="ink-in delay-1 mb-10">
        <span className="diamond" aria-hidden />
      </div>

      <h1
        className="ink-in delay-2 display-script"
        style={{
          fontSize: "clamp(2.75rem, 9vw, 7.5rem)",
        }}
      >
        La Terrasse Verte
      </h1>

      <p className="ink-in delay-3 caps mt-8" aria-label="Restaurant · Café · Salon de Thé">
        Restaurant <span className="opacity-50">·</span> Café{" "}
        <span className="opacity-50">·</span> Salon de Thé
      </p>

      <div className="ink-in delay-4 mt-10 flex items-center gap-4 text-[var(--color-moss)]">
        <span className="h-px w-12 bg-current opacity-40" />
        <span className="diamond diamond-sm" aria-hidden />
        <span className="h-px w-12 bg-current opacity-40" />
      </div>

      <p
        className="ink-in delay-5 mt-6 italic"
        style={{
          fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
          letterSpacing: "0.06em",
          color: "var(--color-moss-deep)",
        }}
      >
        {contact.tagline}
      </p>

      <div className="ink-in delay-6 mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        <Link href="/menu" className="caps-soft inline-flex items-center gap-3 group">
          <span className="h-px w-8 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-14" />
          Voir le menu
          <span className="h-px w-8 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-14" />
        </Link>
        <Link
          href="/commander"
          className="caps tracking-[0.3em] inline-flex items-center justify-center px-7 py-3 bg-[var(--color-moss-deep)] text-[var(--color-cream)] hover:bg-[var(--color-moss)] transition-colors"
          style={{ color: "var(--color-cream)" }}
        >
          Commander
        </Link>
      </div>
    </section>
  );
}

/* ────────────────────────  PROLOGUE  ──────────────────────── */

function Prologue() {
  return (
    <section className="mx-auto max-w-[820px] px-6 sm:px-10 py-24 sm:py-32 text-center">
      <span className="section-kicker">— Bienvenue —</span>
      <h2 className="section-title mt-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
        Une table à Temara, ouverte de l'aube à minuit.
      </h2>
      <p
        className="mt-8 leading-[1.7] text-[var(--color-ink-soft)]"
        style={{ fontSize: "clamp(1rem, 1.15vw, 1.18rem)" }}
      >
        Petits déjeuners marocains et continentaux, mqilat servies au verre de thé,
        salades fraîches, plats maison, pizzas du soir, crêpes et boissons pressées —
        toute la journée, sans interruption.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4 text-[var(--color-moss)]">
        <span className="h-px w-10 bg-current opacity-40" />
        <span className="diamond diamond-sm" aria-hidden />
        <span className="h-px w-10 bg-current opacity-40" />
      </div>
    </section>
  );
}

/* ────────────────────────  SIGNATURES  ────────────────────── */

function Signatures({
  items,
}: {
  items: NonNullable<ReturnType<typeof itemById.get>>[];
}) {
  return (
    <section className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 pb-24">
      <header className="text-center mb-16">
        <span className="diamond" aria-hidden />
        <p className="section-kicker mt-6">Le Carnet</p>
        <h2 className="section-title mt-3" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
          Quelques signatures
        </h2>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
        {items.map((item, i) => (
          <article key={item.id} className="group">
            <p className="caps-soft" style={{ fontSize: "0.65rem" }}>
              {String(i + 1).padStart(2, "0")} · {item.sectionTitle}
            </p>
            <h3
              className="closer mt-3 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }}
            >
              {item.name}
            </h3>
            <div className="mt-3 h-px w-12 bg-[var(--color-moss)] opacity-40 transition-all group-hover:w-20" />
            {item.desc && (
              <p className="mt-4 italic text-[var(--color-ink-soft)] leading-relaxed">
                {item.desc}
              </p>
            )}
            <p className="mt-4 font-serif font-bold text-[var(--color-moss-deep)]">
              {typeof item.price === "number" ? `${item.price} DH` : item.price.join(" / ") + " DH"}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link href="/menu" className="caps-soft inline-flex items-center gap-3 group">
          <span className="h-px w-8 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-14" />
          Explorer toute la carte
          <span className="h-px w-8 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-14" />
        </Link>
      </div>
    </section>
  );
}

/* ────────────────────  SPECIALS INSET  ───────────────────── */

function SpecialsInset() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16 pb-24">
      <div className="frame relative px-8 py-12 sm:px-14 sm:py-16">
        <span className="sparkle absolute -top-3 left-8 bg-[var(--color-cream)] px-2">✦</span>
        <span className="sparkle absolute -top-3 right-8 bg-[var(--color-cream)] px-2">✦</span>

        <div className="text-center">
          <span className="section-kicker">Le rendez-vous de la semaine</span>
          <h3 className="section-title mt-5" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>
            Les Plats du Jour
          </h3>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-16">
          {specials.map((s) => (
            <div key={s.day} className="text-center">
              <p className="caps">{s.day}</p>
              <p className="closer mt-3" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}>
                {s.dish}
              </p>
              <p className="mt-2 italic text-[var(--color-ink-soft)]">49 DH</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────  PILLARS  ───────────────────────── */

function Pillars() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 py-24">
      <div className="grid md:grid-cols-3 gap-y-14 md:gap-x-16 text-center">
        <Pillar
          kicker="01"
          title="À emporter"
          body="Préparez votre panier sur le menu, puis appelez-nous pour confirmer."
          cta="Composer le panier"
          href="/menu"
        />
        <Pillar
          kicker="02"
          title="Sur place"
          body="Une table en terrasse vous attend. Réservez par téléphone."
          cta="Réserver une table"
          href="/nous-trouver"
        />
        <Pillar
          kicker="03"
          title="En livraison"
          body="Notre carte est aussi disponible sur Glovo, livrée à votre porte."
          cta="Voir l'adresse"
          href="/nous-trouver"
        />
      </div>
    </section>
  );
}

function Pillar({
  kicker,
  title,
  body,
  cta,
  href,
}: {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="group">
      <p className="font-mono text-[0.75rem] text-[var(--color-moss)] tracking-[0.25em]">{kicker}</p>
      <h3 className="closer mt-4" style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.2rem)" }}>
        {title}
      </h3>
      <div className="mx-auto mt-4 h-px w-10 bg-[var(--color-moss)] opacity-40 transition-all group-hover:w-20" />
      <p className="mt-5 italic text-[var(--color-ink-soft)] leading-relaxed max-w-xs mx-auto">
        {body}
      </p>
      <Link
        href={href}
        className="caps-soft mt-7 inline-flex items-center gap-3 group/link"
      >
        <span className="h-px w-6 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover/link:w-12" />
        {cta}
      </Link>
    </div>
  );
}

/* ─────────────────────────  CLOSER  ───────────────────────── */

function Closer() {
  return (
    <footer className="relative py-32 text-center">
      <span className="sparkle absolute left-8 top-10 text-base">✦</span>
      <span className="sparkle absolute right-8 top-10 text-base">✦</span>

      <p className="display-script" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
        Bon appétit
      </p>

      <p className="caps mt-10">La Terrasse Verte</p>

      <div className="mt-6 flex items-center justify-center">
        <span className="diamond" aria-hidden />
      </div>

      <p className="caps-soft mt-16 opacity-70">
        © {new Date().getFullYear()} — Temara, Maroc
      </p>
    </footer>
  );
}
