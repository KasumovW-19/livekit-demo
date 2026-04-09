import {
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";
import type { DisconnectReason } from "livekit-client";
import { LIVEKIT_URL } from "../config/livekit";
import type { JoinMediaChoices } from "./PreJoin";
import { ApplyDisplayName } from "./ApplyDisplayName";
import { CallLayout } from "./CallLayout";

type LiveKitCallViewProps = {
  token: string | undefined;
  joinMedia: JoinMediaChoices;
  userSlug: string | null;
  onDisconnected?: (reason?: DisconnectReason) => void;
  onError?: (error: Error) => void;
};

export function LiveKitCallView({
  token,
  joinMedia,
  userSlug,
  onDisconnected,
  onError,
}: LiveKitCallViewProps) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={LIVEKIT_URL}
      connect={true}
      audio={joinMedia.audio}
      video={joinMedia.video}
      data-lk-theme="default"
      onDisconnected={onDisconnected}
      onError={onError}
      className="lk-room"
      style={{ height: "100%", minHeight: 0 }}
    >
      <ApplyDisplayName name={joinMedia.displayName} />
      <CallLayout userSlug={userSlug} />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}
