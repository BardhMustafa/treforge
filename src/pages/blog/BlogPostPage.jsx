import { useQuery } from "convex/react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import { BlogContent } from "../../components/blog/BlogContent";
import { BlogPostCard } from "../../components/blog/BlogPostCard";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = useQuery(api.posts.getPublishedPostBySlug, { slug });
  const allPosts = useQuery(api.posts.getPublishedPosts);

  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const morePosts = allPosts?.filter((p) => p.slug !== slug).slice(0, 2) ?? [];

  return (
    <main style={{ paddingTop: `calc(${SECTION_PADDING_Y} + 70px)`, paddingBottom: SECTION_PADDING_Y, paddingLeft: PAGE_PADDING_X, paddingRight: PAGE_PADDING_X, maxWidth: 1600, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Link
        to="/blog"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", marginBottom: 48, transition: "color 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#00ffb4"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
      >
        ← Back to Blog
      </Link>

      {post === undefined && (
        <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>
      )}

      {post === null && (
        <div>
          <p style={{ fontFamily: "'Orbitron',monospace", fontSize: 20, color: "#fff" }}>Post not found</p>
          <Link to="/blog" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00ffb4" }}>← Back to Blog</Link>
        </div>
      )}

      {post && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
          {/* Main article */}
          <article style={{ maxWidth: 800, width: "100%" }}>
            {post.coverImage && (
              <div style={{ marginBottom: 40, borderRadius: 12, overflow: "hidden" }}>
                <img src={post.coverImage} alt={post.title} style={{ width: "100%", maxHeight: 400, objectFit: "cover", display: "block" }} />
              </div>
            )}
            <header style={{ marginBottom: 48 }}>
              {date && (
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                  {date}
                </div>
              )}
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "clamp(24px, 4vw, 40px)", color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
                {post.title}
              </h1>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                {post.excerpt}
              </p>
            </header>
            <div style={{ borderTop: "1px solid rgba(0,255,180,0.1)", paddingTop: 40 }}>
              <BlogContent html={post.content} />
            </div>
          </article>

          {/* Right sidebar */}
          <aside style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Ad slot */}
            <div style={{ border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 8, padding: 24, minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.15)", letterSpacing: 2, textTransform: "uppercase" }}>Ad Space</span>
            </div>

            {/* More articles */}
            {morePosts.length > 0 && (
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
                  // More Articles
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {morePosts.map((p) => (
                    <BlogPostCard key={p._id} post={p} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
