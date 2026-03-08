import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const mono = "'Space Mono', monospace";
const accent = "#00ffb4";

export function AdminSourcesPage() {
  const sources = useQuery(api.sources.getAllSources) ?? [];
  const createSource = useMutation(api.sources.createSource);
  const toggleSource = useMutation(api.sources.toggleSource);
  const deleteSource = useMutation(api.sources.deleteSource);

  const [form, setForm] = useState({ name: "", url: "", type: "rss" });
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.url) return;
    await createSource(form);
    setForm({ name: "", url: "", type: "rss" });
    setAdding(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, color: "#fff", letterSpacing: 2 }}>SOURCES</h1>
        <button
          onClick={() => setAdding(!adding)}
          style={{ background: accent, color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer", letterSpacing: 1 }}
        >
          {adding ? "Cancel" : "+ Add Source"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: "rgba(0,255,180,0.05)", border: "1px solid rgba(0,255,180,0.2)", borderRadius: 8, padding: 20, marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>NAME</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Anthropic Blog" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontFamily: mono, fontSize: 12, width: 180 }} />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>URL</label>
            <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontFamily: mono, fontSize: 12, width: 300 }} />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>TYPE</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ background: "#05080e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 12px", borderRadius: 4, fontFamily: mono, fontSize: 12 }}>
              <option value="rss">RSS</option>
              <option value="scrape">Scrape</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>
          <button type="submit" style={{ background: accent, color: "#000", border: "none", padding: "8px 18px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer" }}>Save</button>
        </form>
      )}

      {sources.length === 0 ? (
        <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No sources yet. Add one above.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["Name", "URL", "Type", "Last Checked", "Enabled", ""].map(h => (
                <th key={h} style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "left", padding: "8px 12px", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sources.map(source => (
              <tr key={source._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ fontFamily: mono, fontSize: 13, color: "#fff", padding: "12px" }}>{source.name}</td>
                <td style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "12px", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{source.url}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: accent, background: "rgba(0,255,180,0.1)", padding: "2px 8px", borderRadius: 3 }}>{source.type}</span>
                </td>
                <td style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.3)", padding: "12px" }}>
                  {source.lastCheckedAt ? new Date(source.lastCheckedAt).toLocaleDateString() : "Never"}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => toggleSource({ id: source._id })}
                    style={{ background: source.enabled ? "rgba(0,255,180,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${source.enabled ? "rgba(0,255,180,0.4)" : "rgba(255,255,255,0.1)"}`, color: source.enabled ? accent : "rgba(255,255,255,0.3)", padding: "3px 10px", borderRadius: 3, fontFamily: mono, fontSize: 11, cursor: "pointer" }}
                  >
                    {source.enabled ? "ON" : "OFF"}
                  </button>
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => deleteSource({ id: source._id })}
                    style={{ background: "none", border: "1px solid rgba(255,60,60,0.3)", color: "rgba(255,60,60,0.6)", padding: "3px 10px", borderRadius: 3, fontFamily: mono, fontSize: 11, cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
