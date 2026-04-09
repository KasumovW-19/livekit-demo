import { ControlBar } from "@livekit/components-react";

export function CallFooter() {
  return (
    <footer
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        padding: 12,
        paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
        background: "#0b1020",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <ControlBar />
    </footer>
  );
}
