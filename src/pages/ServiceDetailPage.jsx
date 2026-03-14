import { useParams, Link } from "react-router-dom";
import { getServiceBySlug } from "../data/services";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../constants/layout";
import { SectionLabel } from "../components/ui/SectionLabel";
import { ClipBtn } from "../components/ui/ClipBtn";
import { useIsMobile } from "../hooks";
import { useBriefModal } from "../context/BriefModalContext";
import { ProductShowcase } from "../components/services/ProductShowcase";

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const isMobile = useIsMobile();
  const { openBrief } = useBriefModal();

  if (!service) {
    return (
      <main style={{ position: "relative", zIndex: 1, padding: SECTION_PADDING_Y }}>
        <div style={{ paddingLeft: PAGE_PADDING_X, paddingRight: PAGE_PADDING_X }}>
          <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            Service not found.
          </p>
          <ClipBtn as={Link} to="/#services">
            Back to Services
          </ClipBtn>
        </div>
      </main>
    );
  }

  const { icon, title, longDesc, highlights } = service;

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <section
        style={{
          padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}`,
        }}
      >
        <Link
          to="/#services"
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
          ← BACK_TO_SERVICES
        </Link>

        {/* Hero */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <SectionLabel>Service Detail</SectionLabel>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 22, color: "#00ffb4", lineHeight: 1 }}>
              {icon}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 32px",
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {title}
          </h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: isMobile ? 24 : 80,
            alignItems: "end",
          }}>
            <p
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                margin: 0,
                maxWidth: 560,
              }}
            >
              {longDesc}
            </p>
            <ClipBtn as="button" onClick={openBrief} small>
              Get Started →
            </ClipBtn>
          </div>
        </div>

        {highlights?.length > 0 && (
          <div style={{
            padding: "32px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                color: "#00ffb4",
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 20,
                opacity: 0.6,
              }}
            >
              CORE_CAPABILITIES
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    padding: "10px 18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#00ffb4", fontSize: 8 }}>◇</span>
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}

        {service.products?.length > 0 && (
          <div
            style={{
              marginTop: 80,
              padding: "40px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#00ffb4",
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 40,
              }}
            >
              PRODUCTS_WE_SHIP
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 32,
              }}
            >
              {service.products.map((product, i) => (
                <ProductShowcase key={product.title} product={product} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
