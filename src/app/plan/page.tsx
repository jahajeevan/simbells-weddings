import type { Metadata } from "next";
import { PlanWizard } from "@/components/PlanWizard";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Plan My Event",
  description:
    "Begin planning your dream wedding or event with SimBells, Trichy. A few quick questions and J. Simon will reach out personally on WhatsApp.",
};

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's Begin"
        title="Plan my"
        italic="event."
        image="/images/mandap1.jpg"
        alt="A couple in a cinematic landscape"
        subtitle="A few gentle questions — then Simon takes it from here."
      />
      <section className="bg-cream section-y section-x">
        <div className="wrap">
          <PlanWizard />
        </div>
      </section>
    </>
  );
}
