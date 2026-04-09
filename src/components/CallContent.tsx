import { STAGE_ROW_MAX_W } from "../constants/videoGrid";
import { callUi } from "../theme/callUi";
import { VideoGrid } from "./ParticipantVideoGrid";

export function CallContent() {
  return (
    <main
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        padding: 16,
        paddingBottom: "max(28px, calc(96px + env(safe-area-inset-bottom, 0px)))",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: STAGE_ROW_MAX_W + 56,
          borderRadius: callUi.radiusLg,
          padding: "20px 18px",
          background: "rgba(17, 24, 39, 0.55)",
          border: callUi.border,
          boxShadow: callUi.shadowPanel,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <VideoGrid />
      </div>
    </main>
  );
}
