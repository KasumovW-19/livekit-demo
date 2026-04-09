import { callUi } from "../theme/callUi";

type CallHeaderProps = {
  title?: string;
  userSlug: string | null;
  roomName?: string;
};

export function CallHeader({
  title = "Комната",
  userSlug,
  roomName = "test-room",
}: CallHeaderProps) {
  return (
    <header
      style={{
        flexShrink: 0,
        minHeight: 64,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        background: "rgba(15, 23, 42, 0.72)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: callUi.borderSoft,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          minWidth: 0,
        }}
      >
        <span
          style={{
            width: 4,
            height: 26,
            borderRadius: 3,
            background: callUi.accentGradient,
            flexShrink: 0,
            boxShadow: "0 0 16px rgba(110, 231, 183, 0.35)",
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: -0.02 }}>
            {title}
          </div>
          <div style={{ fontSize: 11, color: callUi.textMuted, marginTop: 2 }}>LiveKit</div>
        </div>
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.95)",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textAlign: "center",
          padding: "8px 18px",
          borderRadius: callUi.radiusPill,
          background: callUi.surface,
          border: callUi.borderMint,
          boxShadow: "0 0 28px -10px rgba(110, 231, 183, 0.45)",
          maxWidth: "min(240px, 40vw)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {userSlug ?? "—"}
      </div>

      <div
        style={{
          justifySelf: "end",
          fontSize: 12,
          fontWeight: 600,
          color: callUi.textSecondary,
          padding: "6px 14px",
          borderRadius: callUi.radiusPill,
          background: "rgba(255,255,255,0.06)",
          border: callUi.borderSoft,
          maxWidth: "min(200px, 35vw)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {roomName}
      </div>
    </header>
  );
}
