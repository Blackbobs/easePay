import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Features from "@/components/features";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <main>
      <div>
        <Hero />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <Cta />
      </div>
    </main>
  );
}
