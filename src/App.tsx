import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";

const LIVEKIT_URL = "wss://staticjs123113efgw-xyb045uf.livekit.cloud";
// const LIVEKIT_API_KEY = "APIMGeJTz6kbLUU";
// const LIVEKIT_API_SECRET = "pvhmPU1ysygReN8aHqq0jWPUWNAL8Db4fKoU3vB1EKU";

const token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzU2MzMzNDMsImlkZW50aXR5IjoidXNlcjEiLCJpc3MiOiJBUElNR2VKVHo2a2JMVVUiLCJuYW1lIjoidXNlcjEiLCJuYmYiOjE3NzU1NDY5NDMsInN1YiI6InVzZXIxIiwidmlkZW8iOnsicm9vbSI6InRlc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.ImWmRsdcFCyB5NOnCGDVtWrWqX-37Ci9sfYa2y585eU"
const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzU2MzMzNjYsImlkZW50aXR5IjoidXNlcjIiLCJpc3MiOiJBUElNR2VKVHo2a2JMVVUiLCJuYW1lIjoidXNlcjIiLCJuYmYiOjE3NzU1NDY5NjYsInN1YiI6InVzZXIyIiwidmlkZW8iOnsicm9vbSI6InRlc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.3gz_6ZuGDVE9H8zGXolxzVhSINZ5MlywhLNcnGxQbZU"

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");
  const token = user === "1" ? token1 : token2;

  return (
    <div className="app-shell">
      <LiveKitRoom
        token={token}
        serverUrl={LIVEKIT_URL}
        connect={true}
        audio={true}
        video={true}
        onDisconnected={(reason) => console.log("DISCONNECTED", reason)}
        onError={(error) => console.error("LIVEKIT_ERROR", error)}
        className="lk-room"
        style={{ height: "100%", minHeight: 0 }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
