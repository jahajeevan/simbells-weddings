import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WHY_US } from "@/lib/content";

export function WhyUs() {
  return (
    <section className="relative section-y section-x overflow-hidden">
      {/* Full-bleed cinematic background */}
      <div className="absolute inset-0">
        <Image
          src="/images/couple2.jpg"
          alt="A couple in a sweeping cinematic landscape at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="wrap relative">
        <div className="max-w-2xl mb-16">
          <Reveal>
            <span className="eyebrow text-gold">Why Families Choose Us</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5">
              Trusted with the
              <br />
              <span className="italic font-light text-gold-grad">biggest day.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-champagne/15 rounded-sm overflow-hidden">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08}>
              <div className="bg-ink/40 backdrop-blur-sm p-8 lg:p-10 h-full">
                <span className="font-display italic text-gold text-3xl">0{i + 1}</span>
                <h3 className="font-display text-ivory text-2xl mt-4">{w.title}</h3>
                <p className="text-cream/75 text-sm leading-relaxed mt-3">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
