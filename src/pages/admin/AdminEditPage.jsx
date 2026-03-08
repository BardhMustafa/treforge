import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import { TiptapEditor } from "../../components/admin/TiptapEditor";
import { ImageUpload } from "../../components/admin/ImageUpload";

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

export function AdminEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useQuery(api.posts.getPostByIdAdmin, { id });
  const updatePost = useMutation(api.posts.updatePost);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (post && !loaded) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCoverImage(post.coverImage || "");
      setPublished(post.published);
      setLoaded(true);
    }
  }, [post, loaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updatePost({ id, title, slug, excerpt, content, coverImage: coverImage || undefined, published });
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (post === undefined) {
    return <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>;
  }
  if (post === null) {
    return <p style={{ fontFamily: "'Space Mono',monospace", color: "#ff4466", fontSize: 13 }}>Post not found.</p>;
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, color: "#fff", fontWeight: 700, marginBottom: 32 }}>Edit Post</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input style={inputStyle} value={slug} onChange={(e) => setSlug(e.target.value)} required />
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
          {loaded && <TiptapEditor content={content} onChange={setContent} />}
        </div>

        {error && (
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#ff4466", padding: "8px 12px", background: "rgba(255,68,102,0.08)", borderRadius: 4, border: "1px solid rgba(255,68,102,0.2)" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ accentColor: "#00ffb4" }} />
            Published
          </label>
          <button
            type="submit"
            disabled={saving}
            style={{ marginLeft: "auto", padding: "10px 28px", background: saving ? "rgba(0,255,180,0.3)" : "#00ffb4", color: "#05080e", border: "none", borderRadius: 6, fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
