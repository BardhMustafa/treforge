// Renders a mocked Power BI-style dashboard card with a flow diagram and KPI tiles.
// nodes/nodeLabels: same as PipelineDiagram
// kpis: string[] — 3 KPI tile values to display (e.g. ["$2.4M Revenue", "+18% MoM", "$890K Pipeline"])

import { PipelineDiagram } from "./PipelineDiagram";

export function DashboardMockup({ nodes = [], nodeLabels = [], kpis = [] }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Fake browser/app bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {["rgba(255,80,80,0.5)", "rgba(255,180,0,0.5)", "rgba(0,255,180,0.5)"].map((c, i) => (
          <div
            key={`dot-${i}`}
            style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
          />
        ))}
        <div
          style={{
            marginLeft: 8,
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: 2,
          }}
        >
          POWER_BI — REPORT_VIEW
        </div>
      </div>

      <div style={{ padding: "32px 32px 36px" }}>
        {/* Flow diagram */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            DATA_FLOW
          </div>
          <PipelineDiagram nodes={nodes} nodeLabels={nodeLabels} />
        </div>

        {/* KPI tiles */}
        {kpis.length > 0 && (
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              KEY_METRICS
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${kpis.length}, 1fr)`,
                gap: 10,
              }}
            >
              {kpis.map((kpi, i) => (
                <div
                  key={kpi}
                  style={{
                    padding: "24px 20px",
                    border: "1px solid rgba(0,255,180,0.12)",
                    background: "rgba(0,255,180,0.03)",
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "clamp(16px, 2vw, 24px)",
                      fontWeight: 700,
                      color: "#00ffb4",
                      marginBottom: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {kpi}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: 2,
                    }}
                  >
                    METRIC_{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
