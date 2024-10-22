"use client"
import useRawThemeLightMode from "@/hooks/useRawTheme";

export function useStrokeColor() {
  const theme = useRawThemeLightMode()
  return theme ? "black" : "white";
}
