import { menu, contact, specials, type MenuItem, type MenuSection } from "@/lib/menu";

export default function Home() {
  return (
    <main className="relative z-10 overflow-x-hidden">
      <Cover />
      <Prologue />
      <SpecialsInset />
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16">
        {menu.map((section, i) => (
          <Section key={section.id} section={section} index={i} />
        ))}
      </div>
      <Visitez />
      <Closer />
    </main>
  );
}

/* ─────────────────────────  COVER  ───────────────────────── */

function Cover() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* corner sparkles, matching the PDF */}
      <span className="sparkle sparkle-anim absolute left-8 top-10 text-xl">✦</span>
      <span className="sparkle sparkle-anim absolute right-8 top-10 text-xl" style={{ animationDelay: "1.2s" }}>
        ✦
      </span>
      <span className="sparkle sparkle-anim absolute left-10 bottom-10 text-base" style={{ animationDelay: "2s" }}>
        ✦
      </span>
      <span className="sparkle sparkle-anim absolute right-10 bottom-10 text-base" style={{ animationDelay: "0.7s" }}>
        ✦
      </span>

      <div className="ink-in delay-1 mb-10">
        <span className="diamond" aria-hidden />
      </div>

      <h1
        className="ink-in delay-2 display-script"
        style={{
          fontSize: "clamp(4.5rem, 17vw, 16rem)",
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

      <a
        href="#menu"
        className="ink-in delay-6 caps-soft mt-16 inline-flex items-center gap-3 group"
      >
        <span className="h-px w-8 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-14" />
        Voir le menu
        <span className="h-px w-8 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-14" />
      </a>
    </section>
  );
}

/* ────────────────────────  PROLOGUE  ──────────────────────── */

function Prologue() {
  return (
    <section
      id="menu"
      className="mx-auto max-w-[820px] px-6 sm:px-10 py-24 sm:py-32 text-center"
    >
      <span className="section-kicker">— Bienvenue —</span>
      <h2
        className="section-title mt-6"
        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
      >
        Une table à Temara, ouverte de l'aube à minuit.
      </h2>
      <p
        className="mt-8 leading-[1.7] text-[var(--color-ink-soft)]"
        style={{
          fontSize: "clamp(1rem, 1.15vw, 1.18rem)",
        }}
      >
        Petits déjeuners marocains et continentaux, mqilat servies au verre de thé, salades
        fraîches, plats maison, pizzas du soir, crêpes et boissons pressées — toute la
        journée, sans interruption.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4 text-[var(--color-moss)]">
        <span className="h-px w-10 bg-current opacity-40" />
        <span className="diamond diamond-sm" aria-hidden />
        <span className="h-px w-10 bg-current opacity-40" />
      </div>
    </section>
  );
}

/* ────────────────────  SPECIALS INSET  ───────────────────── */

function SpecialsInset() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16 pb-20">
      <div className="frame relative px-8 py-12 sm:px-14 sm:py-16">
        <span className="sparkle absolute -top-3 left-8 bg-[var(--color-cream)] px-2">✦</span>
        <span className="sparkle absolute -top-3 right-8 bg-[var(--color-cream)] px-2">✦</span>

        <div className="text-center">
          <span className="section-kicker">Le rendez-vous de la semaine</span>
          <h3
            className="section-title mt-5"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
          >
            Les Plats du Jour
          </h3>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-16">
          {specials.map((s) => (
            <div key={s.day} className="text-center">
              <p className="caps">{s.day}</p>
              <p
                className="closer mt-3"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
              >
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

/* ─────────────────────────  SECTION  ───────────────────────── */

function Section({ section, index }: { section: MenuSection; index: number }) {
  const isTwoCol = section.groups.length === 2;
  return (
    <section
      id={section.id}
      className="py-24 sm:py-32 border-t border-[var(--color-moss)]/15 first:border-t-0"
    >
      <header className="text-center mb-16">
        <span className="diamond" aria-hidden />
        {section.kicker && (
          <p className="section-kicker mt-6">{section.kicker}</p>
        )}
        <h2
          className="section-title mt-3"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          {section.title}
        </h2>
        {section.intro && (
          <div className="mx-auto mt-10 max-w-2xl frame px-6 py-5 text-center">
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
        {section.groups.map((group, gi) => (
          <div key={gi}>
            {group.heading && (
              <div className="mb-8 flex items-baseline gap-4">
                <span className="caps">Boissons</span>
                <h3 className="closer text-2xl">{group.heading}</h3>
              </div>
            )}
            <ul className="space-y-5">
              {group.items.map((item) => (
                <Item key={item.name} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {section.note && (
        <div className="mx-auto mt-14 max-w-2xl frame px-6 py-5 text-center">
          <p className="italic text-[var(--color-ink-soft)] leading-relaxed">
            {section.note}
          </p>
        </div>
      )}

      <div className="mt-20 flex items-center justify-center gap-4 text-[var(--color-moss)]">
        <span className="h-px w-12 bg-current opacity-30" />
        <span className="diamond diamond-sm" aria-hidden />
        <span className="h-px w-12 bg-current opacity-30" />
      </div>
    </section>
  );
}

/* ─────────────────────────  ITEM  ───────────────────────── */

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="menu-row px-2 -mx-2 py-1.5">
      <div className="flex items-baseline">
        <p className="font-serif font-semibold text-[1.08rem] sm:text-[1.15rem] text-[var(--color-ink)]">
          {item.name}
          {item.badge && <span className="pill">{item.badge}</span>}
        </p>
        <span className="leader" aria-hidden />
        <p className="font-serif font-bold text-[1.05rem] sm:text-[1.1rem] text-[var(--color-moss-deep)] whitespace-nowrap">
          {typeof item.price === "number" ? `${item.price} DH` : `${item.price[0]} / ${item.price[1]} DH`}
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
    </li>
  );
}

/* ─────────────────────────  VISITEZ  ───────────────────────── */

function Visitez() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16 py-32 border-t border-[var(--color-moss)]/15">
      <header className="text-center mb-20">
        <span className="diamond" aria-hidden />
        <p className="section-kicker mt-6">Nous rendre visite</p>
        <h2
          className="section-title mt-3"
          style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
        >
          Carte de Visite
        </h2>
      </header>

      <div className="grid gap-14 md:grid-cols-3 text-center">
        <div>
          <p className="caps">Heures</p>
          <p className="closer mt-5" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}>
            7h00 — 23h00
          </p>
          <p className="mt-3 italic text-[var(--color-ink-soft)]">Tous les jours, sans interruption</p>
        </div>

        <div className="md:border-x md:border-[var(--color-moss)]/20 md:px-8">
          <p className="caps">Adresse</p>
          <p className="closer mt-5 leading-tight" style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)" }}>
            {contact.address.line1}
            <br />
            {contact.address.line2}
          </p>
          <p className="mt-3 italic text-[var(--color-ink-soft)]">{contact.address.country}</p>
          <a
            href="https://maps.google.com/?q=La+Terrasse+Verte+Temara"
            target="_blank"
            rel="noopener noreferrer"
            className="caps-soft mt-5 inline-flex items-center gap-3 group"
          >
            <span className="h-px w-6 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-10" />
            Itinéraire
          </a>
        </div>

        <div>
          <p className="caps">Réservations</p>
          <p className="closer mt-5 leading-tight font-mono" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}>
            <a href={`tel:${contact.phone[0].replace(/\s/g, "")}`} className="hover:underline">
              {contact.phone[0]}
            </a>
            <br />
            <a href={`tel:${contact.phone[1].replace(/\s/g, "")}`} className="hover:underline">
              {contact.phone[1]}
            </a>
          </p>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="caps-soft mt-5 inline-flex items-center gap-3 group"
          >
            <span className="h-px w-6 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-10" />
            Instagram {contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  CLOSER  ───────────────────────── */

function Closer() {
  return (
    <footer className="relative py-32 text-center">
      <span className="sparkle absolute left-8 top-10 text-base">✦</span>
      <span className="sparkle absolute right-8 top-10 text-base">✦</span>

      <p
        className="display-script"
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
        }}
      >
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
