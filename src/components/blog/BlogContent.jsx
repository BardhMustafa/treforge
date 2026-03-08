export function BlogContent({ html }) {
  return (
    <>
      <style>{`
        .blog-prose { color: rgba(255,255,255,0.8); font-family: 'Space Mono', monospace; font-size: 15px; line-height: 1.8; }
        .blog-prose h1, .blog-prose h2, .blog-prose h3, .blog-prose h4 { font-family: 'Orbitron', monospace; color: #fff; margin: 2em 0 0.6em; line-height: 1.3; }
        .blog-prose h1 { font-size: clamp(22px, 3vw, 30px); }
        .blog-prose h2 { font-size: clamp(18px, 2.5vw, 24px); }
        .blog-prose h3 { font-size: clamp(15px, 2vw, 19px); }
        .blog-prose p { margin: 0 0 1.2em; }
        .blog-prose a { color: #00ffb4; text-decoration: underline; text-decoration-color: rgba(0,255,180,0.4); }
        .blog-prose a:hover { text-decoration-color: #00ffb4; }
        .blog-prose strong { color: #fff; }
        .blog-prose em { color: rgba(255,255,255,0.7); }
        .blog-prose ul, .blog-prose ol { margin: 0 0 1.2em; padding-left: 24px; }
        .blog-prose li { margin-bottom: 0.4em; }
        .blog-prose blockquote { border-left: 3px solid #00ffb4; margin: 1.5em 0; padding: 4px 0 4px 20px; color: rgba(255,255,255,0.55); }
        .blog-prose code { background: rgba(0,255,180,0.08); padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #00ffb4; }
        .blog-prose pre { background: rgba(0,255,180,0.05); border: 1px solid rgba(0,255,180,0.12); border-radius: 8px; padding: 16px 20px; overflow-x: auto; margin: 1.5em 0; }
        .blog-prose pre code { background: none; padding: 0; color: rgba(255,255,255,0.8); }
        .blog-prose img { max-width: 100%; border-radius: 8px; margin: 1.5em 0; }
        .blog-prose hr { border: none; border-top: 1px solid rgba(0,255,180,0.15); margin: 2em 0; }
      `}</style>
      <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
