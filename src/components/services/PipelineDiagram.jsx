// Renders a horizontal node-arrow flow diagram from an array of node names and labels.
// nodes: string[] — the box titles (e.g. "Kafka")
// nodeLabels: string[] — small label shown below each node (e.g. "Queue")

export function PipelineDiagram({ nodes, nodeLabels }) {
  if (!nodes?.length) return null;

  const NODE_W = 180;
  const NODE_H = 80;
  const ARROW_W = 52;
  const TOTAL_W = nodes.length * NODE_W + (nodes.length - 1) * ARROW_W;
  const SVG_H = NODE_H + 32; // node + label space

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <svg
        viewBox={`0 0 ${TOTAL_W} ${SVG_H}`}
        width="100%"
        style={{ display: "block", minWidth: Math.min(TOTAL_W, 320) }}
        aria-label="Pipeline architecture diagram"
      >
        {nodes.map((node, i) => {
          const x = i * (NODE_W + ARROW_W);
          const label = nodeLabels?.[i] ?? "";

          return (
            <g key={`node-${i}`}>
              {/* Arrow between nodes */}
              {i > 0 && (
                <g>
                  <line
                    x1={x - ARROW_W}
                    y1={NODE_H / 2}
                    x2={x - 4}
                    y2={NODE_H / 2}
                    stroke="rgba(0,255,180,0.35)"
                    strokeWidth={1.5}
                  />
                  {/* Arrowhead */}
                  <polygon
                    points={`${x - 4},${NODE_H / 2 - 5} ${x - 4},${NODE_H / 2 + 5} ${x},${NODE_H / 2}`}
                    fill="rgba(0,255,180,0.5)"
                  />
                </g>
              )}

              {/* Node box */}
              <rect
                x={x}
                y={0}
                width={NODE_W}
                height={NODE_H}
                rx={3}
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1}
              />

              {/* Node title */}
              <text
                x={x + NODE_W / 2}
                y={NODE_H / 2 - 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontFamily="'Space Mono', monospace"
                fontSize={12}
              >
                {node.length > 17 ? node.slice(0, 17) + "…" : node}
              </text>

              {/* Label below title */}
              <text
                x={x + NODE_W / 2}
                y={NODE_H / 2 + 10}
                textAnchor="middle"
                fill="#00ffb4"
                fontFamily="'Space Mono', monospace"
                fontSize={10}
                letterSpacing={2}
              >
                {label.toUpperCase()}
              </text>

              {/* Index dot */}
              <circle
                cx={x + 10}
                cy={8}
                r={3}
                fill="rgba(0,255,180,0.2)"
                stroke="rgba(0,255,180,0.4)"
                strokeWidth={0.5}
              />
              <text
                x={x + 10}
                y={8 + 3.5}
                textAnchor="middle"
                fill="#00ffb4"
                fontFamily="'Space Mono', monospace"
                fontSize={6}
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Step labels below the diagram */}
        {nodes.map((_, i) => {
          const x = i * (NODE_W + ARROW_W);
          return (
            <text
              key={`step-${i}`}
              x={x + NODE_W / 2}
              y={NODE_H + 20}
              textAnchor="middle"
              fill="rgba(255,255,255,0.2)"
              fontFamily="'Space Mono', monospace"
              fontSize={9}
              letterSpacing={1}
            >
              {`STEP_${i + 1}`}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
