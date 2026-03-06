export function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "'Orbitron',monospace",
        fontSize: "clamp(30px,5vw,54px)",
        fontWeight: 900,
        color: "#fff",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}
