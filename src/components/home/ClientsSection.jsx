import { useIsMobile } from "../../hooks";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { ClipBtn } from "../ui/ClipBtn";
import { scrollTo } from "../../constants/layout";
import { CLIENTS } from "../../data/clients";
import { ClientCard } from "./ClientCard";

export function ClientsSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="clients"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}
    >
      <SectionLabel>Who We've Helped</SectionLabel>
      <SectionTitle>CLIENTS</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fit, minmax(280px, 1fr))"
            : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: isMobile ? 24 : 32,
          marginTop: "clamp(32px, 6vw, 56px)",
        }}
      >
        {CLIENTS.map((c) => (
          <ClientCard key={c.slug} {...c} />
        ))}
      </div>
      <div
        style={{
          marginTop: "clamp(40px, 8vw, 64px)",
          padding: "clamp(32px, 5vw, 60px) clamp(24px, 4vw, 52px)",
          background:
            "linear-gradient(135deg,rgba(0,255,180,0.06),rgba(0,255,180,0.02))",
          border: "1px solid rgba(0,255,180,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 28,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "clamp(18px, 4vw, 36px)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: 10,
            }}
          >
            READY TO BUILD
            <br />
            SOMETHING REAL?
          </div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Let's talk about your idea. No fluff, just solutions.
          </div>
        </div>
        <ClipBtn onClick={() => scrollTo("contact")}>Get In Touch</ClipBtn>
      </div>
    </section>
  );
}
