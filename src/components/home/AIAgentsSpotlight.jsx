import { Link } from "react-router-dom";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { useIsMobile } from "../../hooks";
import { ClipBtn } from "../ui/ClipBtn";
import { SectionLabel } from "../ui/SectionLabel";

const MONO = "'Space Mono', monospace";
const DISPLAY = "'Orbitron', monospace";
const GREEN = "#00ffb4";

const FLOW = [
  { number: "01", title: "PROPERTY", detail: "Listing context" },
  { number: "02", title: "AGENTCORE", detail: "Agent runtime" },
  { number: "03", title: "MARKET DATA", detail: "Grounded tools" },
  { number: "04", title: "PRICE", detail: "Recommendation" },
];

export function AIAgentsSpotlight() {
  const isMobile = useIsMobile();

  return (
    <section
      id="ai-agents"
      style={{
        padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          right: -260,
          top: -170,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,180,0.075), transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: isMobile ? "28px 22px" : "clamp(40px, 6vw, 72px)",
          background:
            "linear-gradient(135deg, rgba(0,255,180,0.075), rgba(255,255,255,0.018) 48%, rgba(0,255,180,0.025))",
          border: "1px solid rgba(0,255,180,0.2)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.28)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(105deg, transparent 15%, black 75%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: isMobile ? 42 : 64,
            }}
          >
            <SectionLabel>Core Capability · AI Agents</SectionLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                fontFamily: MONO,
                fontSize: 9,
                color: GREEN,
                letterSpacing: 2,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: GREEN,
                  boxShadow: "0 0 14px rgba(0,255,180,0.9)",
                }}
              />
              AGENTS_THAT_SHIP
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.05fr) minmax(400px, 0.95fr)",
              gap: isMobile ? 50 : "clamp(50px, 8vw, 110px)",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "clamp(38px, 6.5vw, 76px)",
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: -2,
                  color: "#fff",
                  margin: "0 0 26px",
                }}
              >
                AI THAT MOVES
                <br />
                <span style={{ color: GREEN }}>WORK FORWARD.</span>
              </h2>

              <p
                style={{
                  fontFamily: MONO,
                  fontSize: isMobile ? 12 : 14,
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 30px",
                  maxWidth: 610,
                }}
              >
                We build focused AI agents that understand your workflow, use your tools and data,
                and return an outcome your team can act on—not another generic chatbot.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 36 }}>
                {["AgentCore", "Tool use", "Business data", "Observability"].map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "9px 12px",
                      border: "1px solid rgba(255,255,255,0.09)",
                      background: "rgba(0,0,0,0.16)",
                      fontFamily: MONO,
                      fontSize: 9,
                      color: "rgba(255,255,255,0.58)",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ClipBtn as={Link} to="/services/ai-integration" small={isMobile}>
                Explore AI Agents →
              </ClipBtn>
            </div>

            <div
              style={{
                padding: isMobile ? 20 : 28,
                background: "rgba(4,9,8,0.88)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.36)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 18,
                  paddingBottom: 22,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 8, color: GREEN, letterSpacing: 3, marginBottom: 9 }}>
                    FEATURED_AGENT
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(20px, 3vw, 30px)", color: "#fff", margin: 0 }}>
                    AI Çmimi
                  </h3>
                </div>
                <span
                  style={{
                    padding: "7px 9px",
                    background: "rgba(0,255,180,0.08)",
                    border: "1px solid rgba(0,255,180,0.16)",
                    fontFamily: MONO,
                    fontSize: 8,
                    color: GREEN,
                    letterSpacing: 1.5,
                  }}
                >
                  PRONEX
                </span>
              </div>

              <p style={{ fontFamily: MONO, fontSize: 11, lineHeight: 1.75, color: "rgba(255,255,255,0.4)", margin: "20px 0 26px" }}>
                A market-aware property pricing agent that helps sellers choose a competitive asking price inside the listing flow.
              </p>

              <div style={{ display: "grid", gap: 8 }}>
                {FLOW.map((step, index) => (
                  <div
                    key={step.number}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "34px 1fr auto",
                      gap: 12,
                      alignItems: "center",
                      padding: "12px 13px",
                      background: index === 1 ? "rgba(0,255,180,0.055)" : "rgba(255,255,255,0.025)",
                      border: index === 1 ? "1px solid rgba(0,255,180,0.14)" : "1px solid rgba(255,255,255,0.055)",
                    }}
                  >
                    <span style={{ fontFamily: MONO, fontSize: 8, color: GREEN }}>{step.number}</span>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 9, color: "rgba(255,255,255,0.78)", letterSpacing: 1 }}>
                        {step.title}
                      </div>
                      <div style={{ fontFamily: MONO, fontSize: 8, color: "rgba(255,255,255,0.28)", marginTop: 4 }}>
                        {step.detail}
                      </div>
                    </div>
                    <span style={{ color: GREEN, fontFamily: MONO, fontSize: 10, opacity: index === FLOW.length - 1 ? 0 : 0.5 }}>
                      ↓
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  marginTop: 18,
                  fontFamily: MONO,
                  fontSize: 8,
                  letterSpacing: 1.5,
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.28)" }}>DECISION SUPPORT</span>
                <span style={{ color: GREEN }}>PRICE + RATIONALE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
