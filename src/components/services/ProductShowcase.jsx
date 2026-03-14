// Wraps a single product: title, tagline, and the appropriate diagram (pipeline or dashboard).
// product shape: { title, tagline, visual, nodes, nodeLabels, kpis? }

import { PipelineDiagram } from "./PipelineDiagram";
import { DashboardMockup } from "./DashboardMockup";

export function ProductShowcase({ product, index }) {
  const { title, tagline, visual, nodes, nodeLabels, kpis } = product;

  return (
    <div
      style={{
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.01)",
        borderRadius: 4,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#00ffb4",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 10,
            opacity: 0.6,
          }}
        >
          PRODUCT_{String(index + 1).padStart(2, "0")}
        </div>
        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(16px, 3vw, 22px)",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px",
            letterSpacing: -0.5,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Diagram */}
      {visual === "dashboard" ? (
        <DashboardMockup nodes={nodes} nodeLabels={nodeLabels} kpis={kpis} />
      ) : (
        <PipelineDiagram nodes={nodes} nodeLabels={nodeLabels} />
      )}
    </div>
  );
}
