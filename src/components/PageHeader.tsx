import Image from "next/image";

export function PageHeader({
  eyebrow,
  title,
  italic,
  image,
  alt,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  image: string;
  alt: string;
  subtitle?: string;
}) {
  return (
    <section className="relative h-[62vh] min-h-[440px] flex items-end overflow-hidden bg-ink">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover ken-burns" />
      {/* Soft scrim — image-forward, text-legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(58,42,34,0.45) 0%, rgba(58,42,34,0.05) 30%, rgba(58,42,34,0.55) 78%, rgba(58,42,34,0.85) 100%)",
        }}
      />

      <div className="relative z-10 wrap section-x pb-16 md:pb-20 w-full">
        {/* Gold-rule eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-12 bg-gold" />
          <span className="eyebrow text-champagne">{eyebrow}</span>
        </div>

        <h1 className="font-display text-ivory text-5xl md:text-6xl lg:text-7xl leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
          {title}
          {italic && (
            <>
              {" "}
              <span className="italic font-light text-blush">{italic}</span>
            </>
          )}
        </h1>

        {subtitle && (
          <p className="font-serif italic text-cream/85 text-xl md:text-2xl mt-5 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
