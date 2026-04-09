import { useState } from "react";
import { resolveLiveKitToken } from "./config/livekit";
import { LiveKitCallView } from "./components/LiveKitCallView";
import { PreJoin, type JoinMediaChoices } from "./components/PreJoin";
import "@livekit/components-styles";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");
  const userSlug =
    user != null && user !== "" && /^\d+$/.test(user) ? `u-${user}` : null;
  const token = resolveLiveKitToken(user);

  const [joinMedia, setJoinMedia] = useState<JoinMediaChoices | null>(null);

  if (joinMedia === null) {
    return (
      <div className="app-shell">
        <div
          className="lk-room"
          style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          <PreJoin userSlug={userSlug} onJoin={setJoinMedia} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <LiveKitCallView
        token={token}
        joinMedia={joinMedia}
        userSlug={userSlug}
        onDisconnected={(reason) => console.log("DISCONNECTED", reason)}
        onError={(error) => console.error("LIVEKIT_ERROR", error)}
      />
    </div>
  );
}
