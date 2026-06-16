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
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 scrim-full" />
      <div className="relative z-10 wrap section-x pb-16 md:pb-20 w-full">
        <div className="flex items-center gap-4 mb-5">
          <span className="eyebrow text-champagne">{eyebrow}</span>
          <span className="h-px w-14 bg-gold" />
        </div>
        <h1 className="font-display text-ivory text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
          {title}
          {italic && (
            <>
              {" "}
              <span className="italic font-light text-gold-grad">{italic}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="font-serif italic text-cream/85 text-xl md:text-2xl mt-5 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
