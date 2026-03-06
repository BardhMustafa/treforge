import { useState } from "react";
import { useIsMobile, useIsSmallScreen } from "../../hooks";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { SERVICES } from "../../data/services";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();
  return (
    <section
      id="services"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}
    >
      <SectionLabel>What We Do</SectionLabel>
      <SectionTitle>SERVICES</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))",
          gap: 2,
          marginTop: "clamp(32px, 6vw, 56px)",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard
            key={s.slug}
            service={s}
            active={active === i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            isSmall={isSmall}
          />
        ))}
      </div>
    </section>
  );
}
