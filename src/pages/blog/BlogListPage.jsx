import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BlogPostCard } from "../../components/blog/BlogPostCard";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";

export function BlogListPage() {
  const posts = useQuery(api.posts.getPublishedPosts);

  return (
    <main style={{ paddingTop: `calc(${SECTION_PADDING_Y} + 70px)`, paddingBottom: SECTION_PADDING_Y, paddingLeft: PAGE_PADDING_X, paddingRight: PAGE_PADDING_X, maxWidth: 1600, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
          // BLOG
        </div>
        <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", lineHeight: 1.15 }}>
          Latest Articles
        </h1>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 16, maxWidth: 480 }}>
          Insights on web development, design systems, and building digital products.
        </p>
      </div>

      {posts === undefined && (
        <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>
      )}

      {posts?.length === 0 && (
        <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No posts published yet.</p>
      )}

      {posts && posts.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: 32 }}>
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
