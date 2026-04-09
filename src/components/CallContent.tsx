import { TILE_GRID_MAX_WIDTH } from "../constants/videoGrid";
import { VideoGrid } from "./ParticipantVideoGrid";

export function CallContent() {
  return (
    <main
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        padding: 16,
        paddingBottom: "max(24px, calc(88px + env(safe-area-inset-bottom, 0px)))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: TILE_GRID_MAX_WIDTH + 32 }}>
        <VideoGrid />
      </div>
    </main>
  );
}
