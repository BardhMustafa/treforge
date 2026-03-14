import { Hero } from "../components/home/Hero";
import { ServicesSection } from "../components/home/ServicesSection";
import { AboutSection } from "../components/home/AboutSection";
import { ClientsSection } from "../components/home/ClientsSection";
import { ContactSection } from "../components/home/ContactSection";
import { LatestPostsSection } from "../components/home/LatestPostsSection";

export function HomePage() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ClientsSection />
      <LatestPostsSection />
      <ContactSection />
    </main>
  );
}
