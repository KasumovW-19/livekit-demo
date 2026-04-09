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
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        background: "#0b1020",
      }}
    >
      <CallHeader userSlug={userSlug} />
      <CallContent />
      <CallFooter />
    </div>
  );
}
