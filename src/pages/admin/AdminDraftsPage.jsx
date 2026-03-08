import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

const mono = "'Space Mono', monospace";
const accent = "#00ffb4";

function statusColor(s) {
  if (s === "approved") return "#00ffb4";
  if (s === "rejected") return "#ff4444";
  return "rgba(255,255,255,0.5)";
}

export function AdminDraftsPage() {
  const drafts = useQuery(api.drafts.getAllDrafts) ?? [];
  const updateDraft = useMutation(api.drafts.updateDraft);
  const approveDraft = useMutation(api.drafts.approveDraft);
  const rejectDraft = useMutation(api.drafts.rejectDraft);
  const postTweet = useAction(api.drafts.postDraftTweet);

  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState({});
  const [posting, setPosting] = useState(false);

  const draft = drafts.find(d => d._id === selected);

  const handleSelect = (d) => {
    setSelected(d._id);
    setEditing({ title: d.title, body: d.body, tweetDraft: d.tweetDraft });
  };

  const handleSave = async () => {
    await updateDraft({ id: selected, ...editing });
  };

  const handleApprove = async () => {
    await handleSave();
    await approveDraft({ id: selected });
  };

  const handleReject = async () => {
    await rejectDraft({ id: selected });
    setSelected(null);
  };

  const handlePostTweet = async () => {
    setPosting(true);
    try {
      await postTweet({ id: selected });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 32, height: "calc(100vh - 180px)" }}>
      {/* List */}
      <div style={{ width: 320, flexShrink: 0, overflowY: "auto" }}>
        <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, color: "#fff", letterSpacing: 2, marginBottom: 20 }}>DRAFTS</h1>
        {drafts.length === 0 && (
          <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No drafts yet.</p>
        )}
        {drafts.map(d => (
          <div
            key={d._id}
            onClick={() => handleSelect(d)}
            style={{ padding: "14px 16px", borderRadius: 6, marginBottom: 8, cursor: "pointer", background: selected === d._id ? "rgba(0,255,180,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${selected === d._id ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.06)"}` }}
          >
            <div style={{ fontFamily: mono, fontSize: 12, color: "#fff", marginBottom: 6, lineHeight: 1.4 }}>{d.title}</div>
            <span style={{ fontFamily: mono, fontSize: 10, color: statusColor(d.status), textTransform: "uppercase", letterSpacing: 1 }}>{d.status}</span>
          </div>
        ))}
      </div>

      {/* Detail */}
      {draft ? (
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6, letterSpacing: 1 }}>TITLE</label>
            <input
              value={editing.title ?? ""}
              onChange={e => setEditing(ed => ({ ...ed, title: e.target.value }))}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", borderRadius: 6, fontFamily: mono, fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6, letterSpacing: 1 }}>ARTICLE BODY</label>
            <textarea
              value={editing.body ?? ""}
              onChange={e => setEditing(ed => ({ ...ed, body: e.target.value }))}
              rows={10}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", borderRadius: 6, fontFamily: mono, fontSize: 13, resize: "vertical" }}
            />
          </div>
          <div>
            <label style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 6, letterSpacing: 1 }}>TWEET DRAFT</label>
            <textarea
              value={editing.tweetDraft ?? ""}
              onChange={e => setEditing(ed => ({ ...ed, tweetDraft: e.target.value }))}
              rows={3}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 14px", borderRadius: 6, fontFamily: mono, fontSize: 13, resize: "vertical" }}
            />
            <div style={{ fontFamily: mono, fontSize: 10, color: (editing.tweetDraft?.length ?? 0) > 280 ? "#ff4444" : "rgba(255,255,255,0.3)", marginTop: 4, textAlign: "right" }}>
              {editing.tweetDraft?.length ?? 0}/280
            </div>
          </div>

          {draft.status === "pending" && (
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={handleApprove} style={{ background: accent, color: "#000", border: "none", padding: "10px 24px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer", letterSpacing: 1 }}>Approve</button>
              <button onClick={handleReject} style={{ background: "none", border: "1px solid rgba(255,60,60,0.4)", color: "rgba(255,60,60,0.8)", padding: "10px 24px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: "pointer" }}>Reject</button>
            </div>
          )}

          {draft.status === "approved" && draft.tweetStatus === "pending" && (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={handlePostTweet}
                disabled={posting}
                style={{ background: "rgba(29,161,242,0.15)", border: "1px solid rgba(29,161,242,0.4)", color: "rgba(29,161,242,0.9)", padding: "10px 24px", borderRadius: 4, fontFamily: mono, fontSize: 12, cursor: posting ? "not-allowed" : "pointer", opacity: posting ? 0.6 : 1 }}
              >
                {posting ? "Posting..." : "Post Tweet"}
              </button>
            </div>
          )}

          {draft.tweetStatus === "posted" && (
            <div style={{ fontFamily: mono, fontSize: 12, color: accent }}>Tweet posted.</div>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,0.2)" }}>Select a draft to review</p>
        </div>
      )}
    </div>
  );
}
