import { contact } from "@/lib/menu";

export default function NousTrouverPage() {
  const addressQuery = encodeURIComponent(
    `${contact.address.line1}, ${contact.address.line2}, ${contact.address.country}`
  );
  const mapEmbed = `https://maps.google.com/maps?q=${addressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

  return (
    <main className="relative z-10">
      <section className="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-16 pt-16 pb-16 text-center">
        <span className="diamond" aria-hidden />
        <p className="section-kicker mt-6">Nous rendre visite</p>
        <h1 className="section-title mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          Carte de Visite
        </h1>
        <p className="mt-6 italic text-[var(--color-ink-soft)] max-w-xl mx-auto">
          Une adresse discrète au cœur de Temara — un café-restaurant ouvert tous les jours,
          sans interruption, de l'aube à minuit.
        </p>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 pb-16">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] border border-[var(--color-moss)]/25 overflow-hidden rounded-sm shadow-[0_30px_60px_-30px_rgba(31,84,48,0.35)]">
          <iframe
            src={mapEmbed}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte — La Terrasse Verte, Temara"
            style={{
              filter:
                "invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.96) contrast(0.88)",
            }}
          />
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 caps tracking-[0.2em] py-2 px-4 bg-[var(--color-cream)] text-[var(--color-moss-deep)] hover:bg-[var(--color-moss-deep)] hover:text-[var(--color-cream)] transition-colors text-[0.7rem] shadow-md"
          >
            Ouvrir dans Maps ↗
          </a>
        </div>
      </section>

      {/* Details grid */}
      <section className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid gap-14 md:grid-cols-3 text-center">
          <div>
            <p className="caps">Adresse</p>
            <p
              className="closer mt-5 leading-tight"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)" }}
            >
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </p>
            <p className="mt-3 italic text-[var(--color-ink-soft)]">{contact.address.country}</p>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="caps-soft mt-5 inline-flex items-center gap-3 group"
            >
              <span className="h-px w-6 bg-[var(--color-ink-soft)] opacity-50 transition-all group-hover:w-10" />
              Itinéraire
            </a>
          </div>

          <div className="md:border-x md:border-[var(--color-moss)]/20 md:px-8">
            <p className="caps">Heures</p>
            <p
              className="closer mt-5"
              style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}
            >
              7h00 — 23h00
            </p>
            <p className="mt-3 italic text-[var(--color-ink-soft)]">
              Tous les jours, sans interruption
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 text-[var(--color-moss)]">
              <span className="h-px w-6 bg-current opacity-40" />
              <span className="diamond diamond-sm" aria-hidden />
              <span className="h-px w-6 bg-current opacity-40" />
            </div>
            <p className="caps-soft mt-4" style={{ fontSize: "0.65rem" }}>
              Petit-déjeuner · Déjeuner · Goûter · Dîner
            </p>
          </div>

          <div>
            <p className="caps">Téléphone</p>
            <p
              className="closer mt-5 leading-tight font-mono"
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
            >
              <a
                href={`tel:${contact.phone[0].replace(/\s/g, "")}`}
                className="hover:underline"
              >
                {contact.phone[0]}
              </a>
              <br />
              <a
                href={`tel:${contact.phone[1].replace(/\s/g, "")}`}
                className="hover:underline"
              >
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
              {contact.instagram}
            </a>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16 py-20">
        <div className="frame px-8 py-14 sm:px-14 sm:py-20 text-center relative">
          <span className="sparkle absolute -top-3 left-8 bg-[var(--color-cream)] px-2">✦</span>
          <span className="sparkle absolute -top-3 right-8 bg-[var(--color-cream)] px-2">✦</span>

          <span className="section-kicker">Réservation</span>
          <h2
            className="section-title mt-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Une table en terrasse
          </h2>
          <p className="mt-6 italic text-[var(--color-ink-soft)] max-w-lg mx-auto">
            Pour réserver une table — seul, à deux, en famille ou en groupe — il suffit d'un coup
            de fil. Nous vous gardons votre place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={`tel:${contact.phone[0].replace(/\s/g, "")}`}
              className="caps tracking-[0.3em] px-7 py-3 bg-[var(--color-moss-deep)] text-[var(--color-cream)] hover:bg-[var(--color-moss)] transition-colors"
              style={{ color: "var(--color-cream)" }}
            >
              Appeler — {contact.phone[0]}
            </a>
            <a
              href={`tel:${contact.phone[1].replace(/\s/g, "")}`}
              className="caps tracking-[0.3em] px-7 py-3 border border-[var(--color-moss-deep)] text-[var(--color-moss-deep)] hover:bg-[var(--color-moss-deep)] hover:text-[var(--color-cream)] transition-colors"
            >
              {contact.phone[1]}
            </a>
          </div>
        </div>
      </section>

      {/* Closer */}
      <footer className="relative py-24 text-center">
        <p className="display-script" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
          À très bientôt
        </p>
        <p className="caps mt-8">La Terrasse Verte</p>
        <div className="mt-4 flex items-center justify-center">
          <span className="diamond diamond-sm" aria-hidden />
        </div>
      </footer>
    </main>
  );
}
