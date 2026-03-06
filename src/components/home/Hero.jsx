import { useState, useEffect } from "react";
import { useIsMobile, useIsSmallScreen } from "../../hooks";
import { PAGE_PADDING_X } from "../../constants/layout";
import { ClipBtn } from "../ui/ClipBtn";
import { GhostBtn } from "../ui/GhostBtn";
import { scrollTo } from "../../constants/layout";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const HERO_WORD = "DRIVEN BY AI";

export function Hero() {
  const [revealed, setRevealed] = useState(0);
  const [, forceUpdate] = useState(0);
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();

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
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: isMobile ? "clamp(80px, 12vh, 100px)" : 0,
        paddingBottom: isMobile ? 60 : 0,
        paddingLeft: PAGE_PADDING_X,
        paddingRight: PAGE_PADDING_X,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              right: -120,
              top: "5%",
              width: 600,
              height: 600,
              border: "1px solid rgba(0,255,180,0.07)",
              borderRadius: "50%",
              animation: "spin 40s linear infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 60,
              top: "18%",
              width: 380,
              height: 380,
              border: "1px solid rgba(0,255,180,0.1)",
              borderRadius: "50%",
              animation: "spin 25s linear infinite reverse",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 180,
              top: "33%",
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle,rgba(0,255,180,0.05) 0%,transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, width: "100%" }}>
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
          AI-Native Digital Agency
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: isMobile ? "clamp(38px,10vw,60px)" : "clamp(52px,8vw,96px)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#fff",
            margin: "0 0 6px",
            letterSpacing: -1,
            userSelect: "none",
          }}
        >
          {display}
        </h1>

        <h2
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: isMobile ? "clamp(16px,5vw,26px)" : "clamp(20px,3vw,42px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.22)",
            margin: "0 0 28px",
            letterSpacing: 2,
          }}
        >
          MVP WITHIN DAYS
          <br />
          NOT WEEKS
        </h2>

        <p
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: isMobile ? 13 : 15,
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.45)",
            maxWidth: 520,
            margin: "0 0 44px",
          }}
        >
          We don't just build — we think with you. From zero to shipped product,
          Treforge is your partner in turning bold ideas into real, working
          solutions.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <ClipBtn onClick={() => scrollTo("contact")} small={isSmall}>
            Start Your MVP
          </ClipBtn>
          <GhostBtn onClick={() => scrollTo("services")} small={isSmall}>
            Our Services
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
            ["5", "Service Areas"],
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
    </section>
  );
}
