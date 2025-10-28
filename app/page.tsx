import SolarHero from "@/components/solar/SolarHero";
import WhyChooseSolar from "@/components/solar/WhyChooseSolar";
import SolarServices from "@/components/solar/SolarServices";
import HowItWorks from "@/components/solar/HowItWorks";
import SolarProducts from "@/components/solar/SolarProducts";
import SolarTestimonials from "@/components/solar/SolarTestimonials";
import SolarCTA from "@/components/solar/SolarCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SolarHero />
      <WhyChooseSolar />
      <SolarServices />
      <HowItWorks />
      <SolarProducts />
      <SolarTestimonials />
      <SolarCTA />
    </div>
  );
}
