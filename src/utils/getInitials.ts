import type { Participant } from "livekit-client";

export function getInitials(participant: Participant): string {
  const raw = (participant.name?.trim() || participant.identity || "?").trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]!.charAt(0);
    const b = parts[parts.length - 1]!.charAt(0);
    return (a + b).toUpperCase();
  }
  return raw.slice(0, 2).toUpperCase() || "?";
}
