export function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Space Mono',monospace",
        fontSize: 10,
        letterSpacing: 6,
        color: "#00ffb4",
        marginBottom: 14,
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 32,
          height: 1,
          background: "#00ffb4",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}
