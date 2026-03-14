import { useBriefModal } from "../../context/BriefModalContext";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { ClipBtn } from "../ui/ClipBtn";

export function ContactSection() {
  const { openBrief } = useBriefModal();
  return (
    <section
      id="contact"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X} clamp(48px,8vw,60px)`, textAlign: "center" }}
    >
      <SectionLabel>Start a Project</SectionLabel>
      <h2
        style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: "clamp(28px,6vw,56px)",
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 16px",
        }}
      >
        LET'S BUILD TOGETHER
      </h2>
      <p
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 13,
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.8,
          marginBottom: 36,
        }}
      >
        Tell us about your idea. We'll respond within 24 hours.
      </p>
      <ClipBtn onClick={openBrief}>START YOUR BRIEF →</ClipBtn>
    </section>
  );
}
