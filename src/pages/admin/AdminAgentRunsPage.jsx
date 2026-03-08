import { useState } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

const mono = "'Space Mono', monospace";
const accent = "#00ffb4";

export function AdminAgentRunsPage() {
  const runs = useQuery(api.agentRuns.getAgentRuns) ?? [];
  const triggerRun = useAction(api.agentRuns.triggerRun);
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    try {
      await triggerRun();
    } finally {
      setRunning(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, color: "#fff", letterSpacing: 2 }}>AGENT RUNS</h1>
        <button
          onClick={handleRun}
          disabled={running}
          style={{ background: running ? "rgba(0,255,180,0.1)" : accent, color: running ? accent : "#000", border: `1px solid ${accent}`, padding: "8px 18px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: running ? "not-allowed" : "pointer", letterSpacing: 1, opacity: running ? 0.7 : 1 }}
        >
          {running ? "Running..." : "▶ Run Now"}
        </button>
      </div>
      {runs.length === 0 ? (
        <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No runs yet. Hit "Run Now" or wait for the automatic 2-day schedule.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["Started", "Completed", "Items Fetched", "Drafts Generated", "Status"].map(h => (
                <th key={h} style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "left", padding: "8px 12px", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runs.map(run => (
              <tr key={run._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ fontFamily: mono, fontSize: 12, color: "#fff", padding: "12px" }}>
                  {new Date(run.startedAt).toLocaleString()}
                </td>
                <td style={{ fontFamily: mono, fontSize: 12, color: "rgba(255,255,255,0.5)", padding: "12px" }}>
                  {run.completedAt ? new Date(run.completedAt).toLocaleString() : "Running..."}
                </td>
                <td style={{ fontFamily: mono, fontSize: 13, color: accent, padding: "12px" }}>{run.itemsFetched}</td>
                <td style={{ fontFamily: mono, fontSize: 13, color: accent, padding: "12px" }}>{run.draftsGenerated}</td>
                <td style={{ padding: "12px" }}>
                  {run.error ? (
                    <span style={{ fontFamily: mono, fontSize: 11, color: "#ff4444", background: "rgba(255,60,60,0.1)", padding: "2px 8px", borderRadius: 3 }} title={run.error}>Error</span>
                  ) : run.completedAt ? (
                    <span style={{ fontFamily: mono, fontSize: 11, color: accent, background: "rgba(0,255,180,0.1)", padding: "2px 8px", borderRadius: 3 }}>Done</span>
                  ) : (
                    <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 3 }}>Running</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
