import { useMediaDevices } from "@livekit/components-react";
import { createLocalTracks, isVideoTrack, type LocalTrack } from "livekit-client";
import { useCallback, useEffect, useRef, useState } from "react";

export type JoinMediaChoices = {
  video: boolean;
  audio: boolean;
  displayName: string;
};

type PreJoinProps = {
  userSlug: string | null;
  onJoin: (choices: JoinMediaChoices) => void;
};

const PANEL_MAX = 300;
const PREVIEW_H = 120;

function previewInitials(displayName: string, userSlug: string | null): string {
  const raw = displayName.trim() || userSlug || "?";
  const parts = raw.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
  }
  return raw.slice(0, 2).toUpperCase() || "?";
}

export function PreJoin({ userSlug, onJoin }: PreJoinProps) {
  const [displayName, setDisplayName] = useState(() => userSlug ?? "");
  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [videoDeviceId, setVideoDeviceId] = useState("");
  const [audioDeviceId, setAudioDeviceId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tracksRef = useRef<LocalTrack[]>([]);

  const videoDevices = useMediaDevices({ kind: "videoinput" });
  const audioDevices = useMediaDevices({ kind: "audioinput" });

  useEffect(() => {
    let cancelled = false;

    for (const t of tracksRef.current) {
      t.detach();
      t.stop();
    }
    tracksRef.current = [];

    const el = videoRef.current;
    if (el) {
      el.srcObject = null;
    }

    if (!camOn && !micOn) {
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      try {
        setError(null);
        const tracks = await createLocalTracks({
          audio: micOn
            ? audioDeviceId
              ? { deviceId: audioDeviceId }
              : true
            : false,
          video: camOn
            ? videoDeviceId
              ? { deviceId: videoDeviceId }
              : true
            : false,
        });
        if (cancelled) {
          tracks.forEach((t) => {
            t.detach();
            t.stop();
          });
          return;
        }
        tracksRef.current = tracks;
        const vt = tracks.find(isVideoTrack);
        if (vt && videoRef.current) {
          vt.attach(videoRef.current);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Не удалось получить доступ к устройствам",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
      for (const t of tracksRef.current) {
        t.detach();
        t.stop();
      }
      tracksRef.current = [];
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [camOn, micOn, videoDeviceId, audioDeviceId]);

  const handleJoin = useCallback(() => {
    onJoin({
      video: camOn,
      audio: micOn,
      displayName: displayName.trim(),
    });
  }, [camOn, micOn, displayName, onJoin]);

  const initials = previewInitials(displayName, userSlug);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
        padding: 16,
        background: "#0b1020",
        color: "#e8e6ed",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: PANEL_MAX,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 12,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Перед входом
        </h1>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            fontSize: 11,
            width: "100%",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.55)" }}>
            Имя в комнате (username)
          </span>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder={userSlug ?? "Как вас видят другие"}
            autoComplete="nickname"
            maxLength={64}
            style={{
              padding: "7px 10px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#111827",
              color: "#f3f4f6",
              fontSize: 13,
            }}
          />
        </label>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: PREVIEW_H,
            borderRadius: 10,
            overflow: "hidden",
            background: "#1e293b",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: camOn ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />
          {!camOn ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: 1,
                color: "rgba(255,255,255,0.88)",
                userSelect: "none",
              }}
              aria-hidden
            >
              {initials}
            </div>
          ) : null}
        </div>

        {error ? (
          <div
            role="alert"
            style={{
              width: "100%",
              padding: "6px 10px",
              borderRadius: 8,
              fontSize: 12,
              background: "rgba(220, 38, 38, 0.15)",
              color: "#fecaca",
              border: "1px solid rgba(248, 113, 113, 0.35)",
            }}
          >
            {error}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            columnGap: 12,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              fontSize: 12,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            <input
              type="checkbox"
              checked={camOn}
              onChange={(e) => setCamOn(e.target.checked)}
            />
            Камера при входе
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              fontSize: 12,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            <input
              type="checkbox"
              checked={micOn}
              onChange={(e) => setMicOn(e.target.checked)}
            />
            Микрофон при входе
          </label>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
          }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11 }}>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Камера</span>
            <select
              value={videoDeviceId}
              onChange={(e) => setVideoDeviceId(e.target.value)}
              disabled={!camOn}
              style={{
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#111827",
                color: "#f3f4f6",
                fontSize: 12,
              }}
            >
              <option value="">По умолчанию</option>
              {videoDevices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Камера ${d.deviceId.slice(0, 8)}…`}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11 }}>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Микрофон</span>
            <select
              value={audioDeviceId}
              onChange={(e) => setAudioDeviceId(e.target.value)}
              disabled={!micOn}
              style={{
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#111827",
                color: "#f3f4f6",
                fontSize: 12,
              }}
            >
              <option value="">По умолчанию</option>
              {audioDevices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Микрофон ${d.deviceId.slice(0, 8)}…`}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={handleJoin}
          style={{
            marginTop: 2,
            padding: "9px 16px",
            borderRadius: 10,
            border: "none",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            color: "#0b1020",
            background: "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)",
            boxShadow: "0 2px 12px rgba(52, 211, 153, 0.22)",
          }}
        >
          Войти в комнату
        </button>
      </div>
    </div>
  );
}
