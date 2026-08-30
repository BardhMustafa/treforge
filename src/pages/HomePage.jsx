import { Hero } from "../components/home/Hero";
import { ServicesSection } from "../components/home/ServicesSection";
import { AboutSection } from "../components/home/AboutSection";
import { ClientsSection } from "../components/home/ClientsSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { ContactSection } from "../components/home/ContactSection";
import { LatestPostsSection } from "../components/home/LatestPostsSection";
import { AIAgentsSpotlight } from "../components/home/AIAgentsSpotlight";
import { PAGE_PADDING_X } from "../constants/layout";

export function HomePage() {
  return (
    <main className="marketing-page" style={{ position: "relative", zIndex: 1, "--page-padding-x": PAGE_PADDING_X }}>
      <Hero />
      <AIAgentsSpotlight />
      <ClientsSection />
      <TestimonialsSection />
      <ServicesSection />
      <AboutSection />
      <LatestPostsSection />
      <ContactSection />
    </main>
  );
}
