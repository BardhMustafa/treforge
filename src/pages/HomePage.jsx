import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import { ServicesSection } from "../components/home/ServicesSection";
import { AboutSection } from "../components/home/AboutSection";
import { ClientsSection } from "../components/home/ClientsSection";
import { ContactSection } from "../components/home/ContactSection";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ClientsSection />
      <ContactSection />
    </main>
  );
}
