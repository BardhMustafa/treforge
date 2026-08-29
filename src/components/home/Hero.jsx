import { useState, useEffect } from "react";
import { useIsMobile, useIsSmallScreen } from "../../hooks";
import { PAGE_PADDING_X, scrollTo } from "../../constants/layout";
import { ClipBtn } from "../ui/ClipBtn";
import { GhostBtn } from "../ui/GhostBtn";
import { useBriefModal } from "../../context/BriefModalContext";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const HERO_WORD = "AI AGENTS THAT MOVE WORK FORWARD.";
const TITLE_BREAK = "AI AGENTS THAT".length;

const AGENT_FLOW = [
  ["01", "BUSINESS CONTEXT", "Goal + workflow"],
  ["02", "AI AGENT", "Reason + orchestrate"],
  ["03", "TOOLS + DATA", "Ground + act"],
  ["04", "BUSINESS OUTCOME", "Return useful work"],
];

function AgentWorkflowPreview() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 460,
        justifySelf: "end",
        padding: 28,
        background:
          "linear-gradient(145deg, rgba(0,255,180,0.055), rgba(4,9,8,0.92) 42%)",
        border: "1px solid rgba(0,255,180,0.16)",
        boxShadow: "0 30px 100px rgba(0,0,0,0.35)",
        position: "relative",
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
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            paddingBottom: 20,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Space Mono',monospace",
          }}
        >
          <div>
            <div style={{ fontSize: 8, color: "#00ffb4", letterSpacing: 3, marginBottom: 7 }}>
              AGENT_WORKFLOW
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)" }}>
              From context to action
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 8,
              color: "#00ffb4",
              letterSpacing: 1.5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00ffb4",
                boxShadow: "0 0 12px rgba(0,255,180,0.85)",
              }}
            />
            AGENTCORE_READY
          </div>
        </div>

        <div style={{ display: "grid", gap: 9, marginTop: 20 }}>
          {AGENT_FLOW.map(([number, title, detail], index) => (
            <div
              key={number}
              style={{
                display: "grid",
                gridTemplateColumns: "34px 1fr auto",
                alignItems: "center",
                gap: 12,
                padding: "13px 14px",
                background: index === 1 ? "rgba(0,255,180,0.06)" : "rgba(255,255,255,0.025)",
                border: index === 1 ? "1px solid rgba(0,255,180,0.18)" : "1px solid rgba(255,255,255,0.06)",
                fontFamily: "'Space Mono',monospace",
              }}
            >
              <span style={{ fontSize: 8, color: "#00ffb4" }}>{number}</span>
              <div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", letterSpacing: 1 }}>
                  {title}
                </div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                  {detail}
                </div>
              </div>
              <span style={{ color: "#00ffb4", opacity: index === AGENT_FLOW.length - 1 ? 0 : 0.45, fontSize: 10 }}>
                ↓
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            fontFamily: "'Space Mono',monospace",
            fontSize: 8,
            letterSpacing: 1.4,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.28)" }}>SECURE · OBSERVABLE</span>
          <span style={{ color: "#00ffb4" }}>BUILT TO SHIP</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [revealed, setRevealed] = useState(0);
  const [, forceUpdate] = useState(0);
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();
  const { openBrief } = useBriefModal();

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();
    let raf;
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const r = Math.floor(progress * HERO_WORD.length);
      setRevealed(r);
      if (r < HERO_WORD.length) {
        forceUpdate((n) => n + 1);
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const display = HERO_WORD.split("")
    .map((c, i) =>
      i < revealed || c === " "
        ? c
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    )
    .join("");

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "center" : "flex-start",
        alignItems: "flex-start",
        paddingTop: isMobile ? "clamp(80px, 12vh, 100px)" : "clamp(112px, 15vh, 150px)",
        paddingBottom: isMobile ? 60 : 72,
        paddingLeft: PAGE_PADDING_X,
        paddingRight: PAGE_PADDING_X,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.12fr) minmax(360px, 0.72fr)",
          gap: isMobile ? 0 : "clamp(54px, 8vw, 120px)",
          alignItems: "center",
        }}
      >
        <div>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            letterSpacing: 5,
            color: "#00ffb4",
            marginBottom: 20,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 1,
              background: "#00ffb4",
              flexShrink: 0,
            }}
          />
          AI-Native Product & Automation Studio
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: isMobile ? "clamp(35px,9.5vw,58px)" : "clamp(44px, min(5.4vw, 8vh), 72px)",
            fontWeight: 900,
            lineHeight: 1.02,
            color: "#fff",
            margin: "0 0 14px",
            letterSpacing: -1.5,
            userSelect: "none",
          }}
        >
          <span style={{ display: "block" }}>{display.slice(0, TITLE_BREAK)}</span>
          <span style={{ display: "block", color: "#00ffb4" }}>
            {display.slice(TITLE_BREAK + 1)}
          </span>
        </h1>

        <h2
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: isMobile ? "clamp(16px,5vw,26px)" : "clamp(20px,3vw,42px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.42)",
            margin: "0 0 26px",
            letterSpacing: 2,
          }}
        >
          FROM IDEA TO PRODUCTION IN DAYS
        </h2>

        <p
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: isMobile ? 13 : 15,
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 620,
            margin: "0 0 44px",
          }}
        >
          We build focused AI agents connected to your tools, data, and workflows—
          alongside the digital products that make them useful.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <ClipBtn onClick={openBrief} small={isSmall}>
            Build Your AI Agent
          </ClipBtn>
          <GhostBtn onClick={() => scrollTo("ai-agents")} small={isSmall}>
            See AI Çmimi
          </GhostBtn>
        </div>

        <div
          style={{
            marginTop: isMobile ? 56 : 80,
            display: "flex",
            gap: isMobile ? 32 : 56,
            flexWrap: "wrap",
          }}
        >
          {[
            ["4+", "Clients Launched"],
            ["AWS", "AgentCore Ready"],
            ["Days", "Not Weeks"],
          ].map(([n, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: "'Orbitron',monospace",
                  fontSize: isMobile ? 26 : 34,
                  fontWeight: 900,
                  color: "#00ffb4",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        </div>

        {!isMobile && <AgentWorkflowPreview />}
      </div>
    </section>
  );
}
