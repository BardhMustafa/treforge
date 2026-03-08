import { useState } from "react";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import { TiptapEditor } from "../../components/admin/TiptapEditor";
import { ImageUpload } from "../../components/admin/ImageUpload";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,255,180,0.15)",
  borderRadius: 6,
  padding: "10px 14px",
  color: "#fff",
  fontFamily: "'Space Mono',monospace",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontFamily: "'Space Mono',monospace",
  fontSize: 11,
  color: "rgba(255,255,255,0.5)",
  letterSpacing: 2,
  textTransform: "uppercase",
  marginBottom: 6,
};

export function AdminCreatePage() {
  const navigate = useNavigate();
  const createPost = useMutation(api.posts.createPost);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!slugTouched) setSlug(slugify(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createPost({ title, slug, excerpt, content, coverImage: coverImage || undefined, published });
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, color: "#fff", fontWeight: 700, marginBottom: 32 }}>New Post</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            style={inputStyle}
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea
            style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Cover Image (optional)</label>
          <ImageUpload onUpload={setCoverImage} currentUrl={coverImage} label="Cover Image" />
        </div>
        <div>
          <label style={labelStyle}>Content</label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {error && (
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#ff4466", padding: "8px 12px", background: "rgba(255,68,102,0.08)", borderRadius: 4, border: "1px solid rgba(255,68,102,0.2)" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ accentColor: "#00ffb4" }} />
            Publish immediately
          </label>
          <button
            type="submit"
            disabled={saving}
            style={{ marginLeft: "auto", padding: "10px 28px", background: saving ? "rgba(0,255,180,0.3)" : "#00ffb4", color: "#05080e", border: "none", borderRadius: 6, fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer" }}
          >
            {saving ? "Saving…" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
