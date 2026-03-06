import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getClientBySlug } from "../data/clients";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../constants/layout";
import { SectionLabel } from "../components/ui/SectionLabel";
import { ClipBtn } from "../components/ui/ClipBtn";
import { useIsMobile } from "../hooks";

export function ClientDetailPage() {
  const { slug } = useParams();
  const client = getClientBySlug(slug);
  const isMobile = useIsMobile();

  if (!client) {
    return (
      <main style={{ position: "relative", zIndex: 1, padding: SECTION_PADDING_Y }}>
        <div style={{ paddingLeft: PAGE_PADDING_X, paddingRight: PAGE_PADDING_X }}>
          <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            Client not found.
          </p>
          <ClipBtn as={Link} to="/#clients">
            Back to Clients
          </ClipBtn>
        </div>
      </main>
    );
  }

  const { name, url, tag, summary, screenshot } = client;
  const [imgError, setImgError] = useState(false);
  const showScreenshot = screenshot && !imgError;

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <section
        style={{
          padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}`,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Link
          to="/#clients"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            color: "#00ffb4",
            letterSpacing: 2,
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 48,
            opacity: 0.6,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = 1)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.6)}
        >
          ← BACK_TO_CLIENTS
        </Link>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 400px",
          gap: isMobile ? 32 : 80,
          alignItems: "end",
          marginBottom: 64,
        }}>
          <div>
            <SectionLabel>Client Case Study</SectionLabel>
            <h1
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: "clamp(40px, 8vw, 84px)",
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 16px",
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {name}
            </h1>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 14,
                color: "#00ffb4",
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </div>
          </div>

          <div style={{ paddingBottom: 10 }}>
            <p
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              {summary}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <ClipBtn small>Visit Project ↗</ClipBtn>
            </a>
          </div>
        </div>

        {showScreenshot && (
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              padding: isMobile ? 10 : 24,
              boxShadow: "0 40px 120px -20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              position: "relative",
            }}
          >
            {/* Glossy Reflection Overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "100%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }} />
            
            <img
              src={screenshot}
              alt={`${name} website screenshot`}
              onError={() => setImgError(true)}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 6,
                filter: "contrast(1.05) brightness(0.95)",
                zIndex: 1,
              }}
            />
          </div>
        )}

        {!showScreenshot && screenshot && (
          <div
            style={{
              aspectRatio: "16/10",
              background: "linear-gradient(135deg, rgba(0,255,180,0.06), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Space Mono',monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            PROJECT_PREVIEW_NOT_FOUND
          </div>
        )}
      </section>
    </main>
  );
}
