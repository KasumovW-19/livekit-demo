import {
  type TrackReferenceOrPlaceholder,
  TrackRefContext,
  VideoTrack,
  useTracks,
  useIsSpeaking,
  useIsMuted,
  isTrackReference,
  useParticipants,
  ParticipantLoop,
  useParticipantContext,
  useParticipantTracks,
  ParticipantName,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import type { CSSProperties } from "react";
import {
  RAIL_GAP,
  RAIL_TILE_H,
  RAIL_TILE_W,
  STAGE_CAMERA_FLEX,
  STAGE_CAMERA_H,
  STAGE_CAMERA_MAX_W,
  STAGE_CAMERA_MIN_W,
  STAGE_GAP,
  STAGE_ROW_MAX_W,
  STAGE_SCREEN_FLEX,
  STAGE_SCREEN_MAX_H,
  STAGE_SCREEN_MIN_H,
  STAGE_SCREEN_MIN_W,
} from "../constants/videoGrid";
import { callUi } from "../theme/callUi";
import { getInitials } from "../utils/getInitials";

type TileVariant = "stage-screen" | "stage-camera" | "rail";

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: callUi.textMuted,
        marginBottom: 2,
      }}
    >
      {children}
    </div>
  );
}

function trackKey(ref: TrackReferenceOrPlaceholder): string {
  return `${ref.participant.identity}-${ref.source}`;
}

function VideoTile({ variant }: { variant: TileVariant }) {
  return (
    <TrackRefContext.Consumer>
      {(trackRef) => (trackRef ? <VideoTileInner trackRef={trackRef} variant={variant} /> : null)}
    </TrackRefContext.Consumer>
  );
}

function VideoTileInner({
  trackRef,
  variant,
}: {
  trackRef: TrackReferenceOrPlaceholder;
  variant: TileVariant;
}) {
  const isScreenShare = trackRef.source === Track.Source.ScreenShare;
  const isSpeaking = useIsSpeaking(trackRef.participant);
  const isMuted = useIsMuted(trackRef);
  const initials = getInitials(trackRef.participant);
  const showVideoTrack =
    isTrackReference(trackRef) &&
    !isMuted &&
    (trackRef.source === Track.Source.Camera || trackRef.source === Track.Source.ScreenShare);

  const isRail = variant === "rail";
  const isStageScreen = variant === "stage-screen";

  const boxStyle: CSSProperties =
    variant === "stage-screen"
      ? {
          position: "relative",
          flex: STAGE_SCREEN_FLEX,
          minWidth: STAGE_SCREEN_MIN_W,
          maxWidth: "100%",
          width: "100%",
          height: `min(${STAGE_SCREEN_MAX_H}px, 42vh)`,
          minHeight: STAGE_SCREEN_MIN_H,
          borderRadius: callUi.radiusMd,
          overflow: "hidden",
          background: callUi.surfaceDeep,
          boxSizing: "border-box",
          border: callUi.borderSoft,
        }
      : variant === "stage-camera"
        ? {
            position: "relative",
            flex: STAGE_CAMERA_FLEX,
            minWidth: STAGE_CAMERA_MIN_W,
            maxWidth: STAGE_CAMERA_MAX_W,
            width: "100%",
            height: STAGE_CAMERA_H,
            borderRadius: callUi.radiusMd,
            overflow: "hidden",
            background: callUi.surface2,
            boxSizing: "border-box",
            border: callUi.borderSoft,
          }
        : {
            position: "relative",
            width: RAIL_TILE_W,
            height: RAIL_TILE_H,
            flexShrink: 0,
            borderRadius: callUi.radiusSm,
            overflow: "hidden",
            background: callUi.surface2,
            boxSizing: "border-box",
            border: callUi.borderSoft,
          };

  const initialsFontSize = isRail ? 22 : isStageScreen ? 48 : 44;

  return (
    <div
      style={{
        ...boxStyle,
        transition: "box-shadow 0.18s ease",
        boxShadow: isSpeaking
          ? "0 0 0 2px rgba(52, 211, 153, 0.95), 0 0 20px rgba(52, 211, 153, 0.28)"
          : callUi.shadowTileIdle,
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
          fontSize: initialsFontSize,
          fontWeight: 700,
          letterSpacing: isRail ? 0.5 : 1,
          color: "rgba(255,255,255,0.88)",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        {isScreenShare ? "Экран" : initials}
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
              objectFit: isScreenShare ? "contain" : "cover",
            }}
          />
        </div>
      ) : null}
      {isStageScreen && isScreenShare ? (
        <div
          style={{
            position: "absolute",
            left: 10,
            bottom: 10,
            zIndex: 2,
            padding: "5px 10px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: "#e0f2fe",
            background: "rgba(30, 58, 138, 0.88)",
          }}
        >
          Демонстрация экрана
        </div>
      ) : null}
      {isSpeaking ? (
        <div
          style={{
            position: "absolute",
            top: isRail ? 4 : 8,
            right: isRail ? 4 : 8,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: isRail ? 2 : 4,
            padding: isRail ? "2px 5px" : "3px 8px",
            borderRadius: 999,
            fontSize: isRail ? 8 : 10,
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
              width: isRail ? 5 : 6,
              height: isRail ? 5 : 6,
              borderRadius: "50%",
              background: "#6ee7b7",
              animation: "lk-speaking-dot 1s ease-in-out infinite",
            }}
          />
          {!isRail ? "Говорит" : null}
        </div>
      ) : null}
    </div>
  );
}

function StripParticipantBlock() {
  const participant = useParticipantContext();
  const cameraRefs = useParticipantTracks([Track.Source.Camera]);
  const trackRef: TrackReferenceOrPlaceholder =
    cameraRefs[0] ?? { participant, source: Track.Source.Camera };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
        width: RAIL_TILE_W,
      }}
    >
      <TrackRefContext.Provider value={trackRef}>
        <VideoTile variant="rail" />
      </TrackRefContext.Provider>
      <ParticipantName
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: callUi.textSecondary,
          textAlign: "center",
          maxWidth: RAIL_TILE_W,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
    </div>
  );
}

export function VideoGrid() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);
  const participants = useParticipants();

  const screenStageRefs = tracks.filter(
    (t) => t.source === Track.Source.ScreenShare && isTrackReference(t),
  );
  const cameraStageRefs = tracks.filter(
    (t) =>
      t.source === Track.Source.Camera &&
      isTrackReference(t) &&
      !t.publication.isMuted,
  );

  const hasStageContent = screenStageRefs.length > 0 || cameraStageRefs.length > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        width: "100%",
        maxWidth: STAGE_ROW_MAX_W,
        margin: "0 auto",
        minHeight: 0,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>Камера и демонстрация</SectionLabel>
        {hasStageContent ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: STAGE_GAP,
              justifyContent: "center",
              alignItems: "stretch",
              width: "100%",
            }}
          >
            {screenStageRefs.map((ref) => (
              <TrackRefContext.Provider key={trackKey(ref)} value={ref}>
                <VideoTile variant="stage-screen" />
              </TrackRefContext.Provider>
            ))}
            {cameraStageRefs.map((ref) => (
              <TrackRefContext.Provider key={trackKey(ref)} value={ref}>
                <VideoTile variant="stage-camera" />
              </TrackRefContext.Provider>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "28px 16px",
              borderRadius: callUi.radiusMd,
              background: "rgba(15, 23, 42, 0.65)",
              border: callUi.borderSoft,
              color: callUi.textFaint,
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            Включите камеру или демонстрацию экрана — здесь появится крупное видео, как на экране
            перед входом.
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionLabel>Участники</SectionLabel>
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            padding: "10px 8px",
            margin: "0 -8px",
            borderRadius: callUi.radiusMd,
            background: "rgba(15, 23, 42, 0.4)",
            border: callUi.borderSoft,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: RAIL_GAP,
              justifyContent: "center",
              minWidth: "min-content",
              padding: "2px 4px",
            }}
          >
            <ParticipantLoop participants={participants}>
              <StripParticipantBlock />
            </ParticipantLoop>
          </div>
        </div>
      </div>
    </div>
  );
}
