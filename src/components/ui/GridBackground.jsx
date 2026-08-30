export function GridBackground({ subdued = false }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: subdued ? 0.4 : 1,
        backgroundImage: `linear-gradient(rgba(0,255,180,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.04) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  );
}
