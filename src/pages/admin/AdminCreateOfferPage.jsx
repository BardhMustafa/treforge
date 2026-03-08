import { useState } from "react";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import { ImageUpload } from "../../components/admin/ImageUpload";

const MONO = "'Space Mono',monospace";
const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,180,0.15)", borderRadius: 6, padding: "10px 14px", color: "#fff", fontFamily: MONO, fontSize: 13, outline: "none", boxSizing: "border-box" };
const labelStyle = { display: "block", fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 };

export function AdminCreateOfferPage() {
  const navigate = useNavigate();
  const createOffer = useMutation(api.offers.createOffer);

  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [offerTitle, setOfferTitle] = useState("");
  const [description, setDescription] = useState("");
  const [infoLink, setInfoLink] = useState("");
  const [mvpLink, setMvpLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createOffer({
        companyName,
        companyLogo: companyLogo || undefined,
        offerTitle,
        description,
        infoLink: infoLink || undefined,
        mvpLink: mvpLink || undefined,
      });
      navigate("/admin/offers");
    } catch (err) {
      setError(err.message || "Failed to create offer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, color: "#fff", fontWeight: 700, marginBottom: 32 }}>New Offer</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <label style={labelStyle}>Company Name</label>
          <input style={inputStyle} value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Company Logo (optional)</label>
          <ImageUpload onUpload={setCompanyLogo} currentUrl={companyLogo} label="Logo" />
        </div>
        <div>
          <label style={labelStyle}>Offer Title</label>
          <input style={inputStyle} value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Info Link (optional)</label>
          <input style={inputStyle} value={infoLink} onChange={(e) => setInfoLink(e.target.value)} placeholder="https://" />
        </div>
        <div>
          <label style={labelStyle}>MVP Link (optional)</label>
          <input style={inputStyle} value={mvpLink} onChange={(e) => setMvpLink(e.target.value)} placeholder="https://" />
        </div>

        {error && <div style={{ fontFamily: MONO, fontSize: 12, color: "#ff4466" }}>{error}</div>}

        <button
          type="submit"
          disabled={saving}
          style={{ alignSelf: "flex-start", padding: "10px 28px", background: saving ? "rgba(0,255,180,0.3)" : "#00ffb4", color: "#05080e", border: "none", borderRadius: 6, fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer" }}
        >
          {saving ? "Creating…" : "Create Offer"}
        </button>
      </form>
    </div>
  );
}
