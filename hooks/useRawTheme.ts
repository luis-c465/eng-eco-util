"use client"

import { useTheme } from "next-themes";

export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "light"
export const DEFAULT_THEME_LIGHT = DEFAULT_THEME === "light"

/**
 * Returns if the current theme is light mode.
 * Returns `true` when the theme cannot be determined.
 */
export default function useRawThemeLightMode() : boolean | undefined {
  const {theme} = useTheme()

  if (!theme) return DEFAULT_THEME_LIGHT

  return theme === "light"
}
