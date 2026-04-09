/** Общая палитра с экрана PreJoin и карточек ввода */
export const callUi = {
  pageBg: "#0b1020",
  text: "#e8e6ed",
  textSecondary: "rgba(255,255,255,0.75)",
  textMuted: "rgba(255,255,255,0.55)",
  textFaint: "rgba(255,255,255,0.4)",

  surface: "#111827",
  surface2: "#1e293b",
  surfaceDeep: "#0f172a",

  border: "1px solid rgba(255,255,255,0.12)",
  borderSoft: "1px solid rgba(255,255,255,0.08)",
  borderMint: "1px solid rgba(110, 231, 183, 0.28)",

  radiusLg: 16,
  radiusMd: 12,
  radiusSm: 10,
  radiusPill: 999,

  accentGradient: "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)",

  shadowPanel:
    "0 0 0 1px rgba(255,255,255,0.06) inset, 0 18px 48px -16px rgba(0,0,0,0.55)",
  shadowTileIdle: "0 0 0 1px rgba(255,255,255,0.08)",
  shadowFooter: "0 -10px 40px -12px rgba(0,0,0,0.45)",

  glowMint:
    "radial-gradient(ellipse 85% 55% at 50% -12%, rgba(167, 243, 208, 0.14), transparent 50%)",
  glowViolet:
    "radial-gradient(ellipse 50% 35% at 92% 88%, rgba(130, 90, 220, 0.1), transparent 55%)",
} as const;
