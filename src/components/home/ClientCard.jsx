import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsSmallScreen } from "../../hooks";

export function ClientCard({ name, url, tag, slug, screenshot }) {
  const [hov, setHov] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isSmall = useIsSmallScreen();
  const showScreenshot = screenshot && !imgError;

  return (
    <Link
      to={`/clients/${slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: hov ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
        border: `1px solid ${hov ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hov ? "0 10px 30px -10px rgba(0,255,180,0.12)" : "none",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
      }}
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {showScreenshot && (
        <div style={{ overflow: "hidden", background: "#000", position: "relative" }}>
          <img
            src={screenshot}
            alt={`${name} website`}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              transition: "transform 0.5s, opacity 0.5s",
              transform: hov ? "scale(1.05)" : "scale(1)",
              opacity: hov ? 1 : 0.75,
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)`,
            opacity: hov ? 1 : 0.6,
            transition: "all 0.4s",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, rgba(5,8,14,0.6) 0%, transparent 60%)`,
            opacity: hov ? 0.3 : 1,
            transition: "opacity 0.4s",
          }} />
        </div>
      )}
      {!showScreenshot && (
        <div
          style={{
            aspectRatio: "16/10",
            background: "linear-gradient(135deg, rgba(0,255,180,0.06), rgba(255,255,255,0.03))",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: 2,
          }}
        >
          PROJECT_PREVIEW
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00ffb4",
          boxShadow: hov ? "0 0 10px #00ffb4" : "none",
          opacity: hov ? 1 : 0.4,
          transition: "all 0.3s",
          zIndex: 2,
        }}
      />
      <div style={{ padding: isSmall ? "20px" : "28px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 9,
            color: hov ? "#00ffb4" : "rgba(0,255,180,0.7)",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 8,
            transition: "color 0.3s",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 16,
            letterSpacing: 1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 16,
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            color: hov ? "#00ffb4" : "rgba(255,255,255,0.35)",
            letterSpacing: 2,
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          VIEW_DETAILS <span style={{ transform: hov ? "translateX(4px)" : "none", transition: "transform 0.3s" }}>→</span>
        </div>
      </div>
    </Link>
  );
}
