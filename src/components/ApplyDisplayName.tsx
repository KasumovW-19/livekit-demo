import { useLocalParticipant } from "@livekit/components-react";
import { useEffect } from "react";

export function ApplyDisplayName({ name }: { name: string }) {
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    const trimmed = name.trim();
    if (!trimmed) return;
    void localParticipant.setName(trimmed).catch((err) => {
      console.warn("setName failed", err);
    });
  }, [localParticipant, name]);

  return null;
}
