import {
  type TrackReferenceOrPlaceholder,
  TrackLoop,
  VideoTrack,
  TrackRefContext,
  useTracks,
  useIsSpeaking,
  useIsMuted,
  isTrackReference,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import {
  TILE_GAP,
  TILE_GRID_MAX_WIDTH,
  TILE_H,
  TILE_W,
} from "../constants/videoGrid";
import { getInitials } from "../utils/getInitials";

function ParticipantTileInner({ trackRef }: { trackRef: TrackReferenceOrPlaceholder }) {
  const isSpeaking = useIsSpeaking(trackRef.participant);
  const isCameraMuted = useIsMuted(trackRef);
  const initials = getInitials(trackRef.participant);
  const showVideoTrack =
    isTrackReference(trackRef) && trackRef.source === Track.Source.Camera && !isCameraMuted;

  return (
    <div
      style={{
        position: "relative",
        width: TILE_W,
        height: TILE_H,
        flex: "0 0 auto",
        borderRadius: 12,
        overflow: "hidden",
        background: "#1e293b",
        boxSizing: "border-box",
        transition: "box-shadow 0.18s ease",
        boxShadow: isSpeaking
          ? "0 0 0 2px rgba(52, 211, 153, 0.95), 0 0 16px rgba(52, 211, 153, 0.25)"
          : "0 0 0 0 transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 1,
          color: "rgba(255,255,255,0.88)",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        {initials}
      </div>
      {showVideoTrack ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "#0f172a",
          }}
        >
          <VideoTrack
            trackRef={trackRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ) : null}
      {isSpeaking ? (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 8px",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 0.02,
            color: "#ecfdf5",
            background: "rgba(6, 95, 70, 0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
          }}
          aria-live="polite"
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#6ee7b7",
              animation: "lk-speaking-dot 1s ease-in-out infinite",
            }}
          />
          Говорит
        </div>
      ) : null}
    </div>
  );
}

function ParticipantTile() {
  return (
    <TrackRefContext.Consumer>
      {(trackRef) => (trackRef ? <ParticipantTileInner trackRef={trackRef} /> : null)}
    </TrackRefContext.Consumer>
  );
}

export function VideoGrid() {
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: TILE_GAP,
        justifyContent: "center",
        maxWidth: TILE_GRID_MAX_WIDTH,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <TrackLoop tracks={tracks}>
        <ParticipantTile />
      </TrackLoop>
    </div>
  );
}
