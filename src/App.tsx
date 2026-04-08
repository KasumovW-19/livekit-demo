import {
  type TrackReferenceOrPlaceholder,
  TrackLoop,
  VideoTrack,
  TrackRefContext,
  useTracks,
  useIsSpeaking,
  useIsMuted,
  isTrackReference,
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import { Track, type Participant } from "livekit-client";
import "@livekit/components-styles";

const LIVEKIT_URL = "wss://staticjs123113efgw-xyb045uf.livekit.cloud";

const TILE_W = 250;
const TILE_H = 150;
const TILE_GAP = 12;
const TILE_COLS = 4;
const TILE_GRID_MAX_WIDTH = TILE_COLS * TILE_W + (TILE_COLS - 1) * TILE_GAP;

function getInitials(participant: Participant): string {
  const raw = (participant.name?.trim() || participant.identity || "?").trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]!.charAt(0);
    const b = parts[parts.length - 1]!.charAt(0);
    return (a + b).toUpperCase();
  }
  return raw.slice(0, 2).toUpperCase() || "?";
}

const token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzU3NzEyMTgsImlkZW50aXR5IjoidXNlcjEiLCJpc3MiOiJBUElNR2VKVHo2a2JMVVUiLCJuYW1lIjoidXNlcjEiLCJuYmYiOjE3NzU2ODQ4MTgsInN1YiI6InVzZXIxIiwidmlkZW8iOnsicm9vbSI6InRlc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.9lW8jf7WKO2hMm6FVBPBUlU3hjOcnj1vVXPK1FYUGUY";
const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzU3NzEyNDEsImlkZW50aXR5IjoidXNlcjIiLCJpc3MiOiJBUElNR2VKVHo2a2JMVVUiLCJuYW1lIjoidXNlcjIiLCJuYmYiOjE3NzU2ODQ4NDEsInN1YiI6InVzZXIyIiwidmlkZW8iOnsicm9vbSI6InRlc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.kxTCk97qhtHo9yGzU9AVaDFkKQoL5r8Qx_ImP0Uhsj0";

function TileInner({ trackRef }: { trackRef: TrackReferenceOrPlaceholder }) {
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

function Tile() {
  return (
    <TrackRefContext.Consumer>
      {(trackRef) => (trackRef ? <TileInner trackRef={trackRef} /> : null)}
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
        <Tile />
      </TrackLoop>
    </div>
  );
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");
  const userSlug =
    user != null && user !== "" && /^\d+$/.test(user) ? `u-${user}` : null;
  const token = user === "1" ? token1 : token2;

  return (
    <div className="app-shell">
      <LiveKitRoom
        token={token}
        serverUrl={LIVEKIT_URL}
        connect={true}
        audio={false}
        video={false}
        data-lk-theme="default"
        onDisconnected={(reason) => console.log("DISCONNECTED", reason)}
        onError={(error) => console.error("LIVEKIT_ERROR", error)}
        className="lk-room"
        style={{ height: "100%", minHeight: 0 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: 0,
            background: "#0b1020",
          }}
        >
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
            <div style={{ color: "#fff", fontWeight: 600 }}>My Call UI</div>
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
              test-room
            </div>
          </header>

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
        </div>

        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
