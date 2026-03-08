import { Link } from "react-router-dom";

export function BlogPostCard({ post }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
    >
      <article
        style={{
          border: "1px solid rgba(0,255,180,0.12)",
          borderRadius: 10,
          overflow: "hidden",
          background: "rgba(0,255,180,0.02)",
          transition: "border-color 0.2s, transform 0.2s",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,255,180,0.35)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,255,180,0.12)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {post.coverImage && (
          <div style={{ height: 180, overflow: "hidden", flexShrink: 0 }}>
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          {date && (
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
              {date}
            </div>
          )}
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, flex: 1 }}>
            {post.excerpt}
          </p>
          <div style={{ marginTop: 16, fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", letterSpacing: 2, textTransform: "uppercase" }}>
            Read More →
          </div>
        </div>
      </article>
    </Link>
  );
}
