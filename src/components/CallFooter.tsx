import { ControlBar } from "@livekit/components-react";
import { callUi } from "../theme/callUi";

export function CallFooter() {
  return (
    <footer
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        padding: "0 12px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "linear-gradient(to top, rgba(11, 16, 32, 0.97) 40%, transparent)",
      }}
    >
      <div
        className="lk-call-footer-bar"
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 720,
          marginTop: 8,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
          borderTopLeftRadius: callUi.radiusLg,
          borderTopRightRadius: callUi.radiusLg,
          background: "rgba(17, 24, 39, 0.92)",
          border: callUi.border,
          borderBottom: "none",
          boxShadow: callUi.shadowFooter,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <ControlBar />
      </div>
    </footer>
  );
}
