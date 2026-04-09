type CallHeaderProps = {
  title?: string;
  userSlug: string | null;
  roomName?: string;
};

export function CallHeader({
  title = "My Call UI",
  userSlug,
  roomName = "test-room",
}: CallHeaderProps) {
  return (
    <header
      style={{
        flexShrink: 0,
        height: 64,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ color: "#fff", fontWeight: 600 }}>{title}</div>
      <div
        style={{
          color: "rgba(255,255,255,0.92)",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        {userSlug ?? "—"}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
          justifySelf: "end",
        }}
      >
        {roomName}
      </div>
    </header>
  );
}
