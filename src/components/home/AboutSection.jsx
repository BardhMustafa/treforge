import { useIsMobile } from "../../hooks";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { PROCESS } from "../../data/process";
import { ProcessCard } from "./ProcessCard";

export function AboutSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="about"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "clamp(32px, 6vw, 48px)" : 80,
          alignItems: "start",
        }}
      >
        <div>
          <SectionLabel>How We Work</SectionLabel>
          <h2
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: isMobile ? "clamp(26px,7vw,40px)" : "clamp(28px,3.5vw,48px)",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 24px",
            }}
          >
            WE THINK
            <br />
            BEFORE WE BUILD
          </h2>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.9,
              margin: "0 0 18px",
            }}
          >
            We start with your customers, your team, and the problem you want to
            solve. Together, we define the scope, priorities, and what a successful
            first release should do.
          </p>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            Whether you're pitching to investors or solving an internal
            bottleneck, Treforge brings technical depth and strategic clarity to
            every engagement.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PROCESS.map((p, i) => (
            <ProcessCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
