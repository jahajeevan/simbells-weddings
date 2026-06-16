import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Services } from "@/components/home/Services";
import { Packages } from "@/components/home/Packages";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";
import { FilmCTA } from "@/components/home/FilmCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Services />
      <Packages />
      <GalleryPreview />
      <WhyUs />
      <Testimonials />
      <FilmCTA />
    </>
  );
}
