import { callUi } from "../theme/callUi";
import { CallContent } from "./CallContent";
import { CallFooter } from "./CallFooter";
import { CallHeader } from "./CallHeader";

type CallLayoutProps = {
  userSlug: string | null;
};

export function CallLayout({ userSlug }: CallLayoutProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        background: callUi.pageBg,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `${callUi.glowMint}, ${callUi.glowViolet}`,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <CallHeader userSlug={userSlug} />
        <CallContent />
        <CallFooter />
      </div>
    </div>
  );
}
