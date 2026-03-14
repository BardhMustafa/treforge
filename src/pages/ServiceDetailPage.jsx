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

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 80,
          alignItems: "start",
          marginBottom: 64,
        }}>
          <div>
            <SectionLabel>Service Detail</SectionLabel>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 64,
                color: "#00ffb4",
                marginBottom: 20,
              }}
            >
              {icon}
            </div>
            <h1
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: 900,
                color: "#fff",
                margin: "0",
                lineHeight: 1,
                letterSpacing: -1,
              }}
            >
              {title}
            </h1>
          </div>

          <div style={{ paddingTop: isMobile ? 0 : 64 }}>
            <p
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.9,
                marginBottom: 32,
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
            marginTop: 80,
            padding: "40px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                color: "#00ffb4",
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 32,
              }}
            >
              CORE_CAPABILITIES
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    padding: "24px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    background: "rgba(255,255,255,0.01)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span style={{ color: "#00ffb4" }}>◇</span>
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
