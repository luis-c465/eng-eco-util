"use client"

import { Label } from "#/ui/label"
import { Switch } from "#/ui/switch"
import { useAtom } from "jotai"

import { fullModeAtom, store } from "./atom"

export default function FullModeSwitch() {
  const [fullMode, setFullMode] = useAtom(fullModeAtom, { store })

  return (
    <div className="flex gap-2 items-center">
      <Switch
        defaultChecked={fullMode}
        onCheckedChange={setFullMode}
        id="full-mode"
      />
      <Label htmlFor="full-mode">Full mode</Label>
    </div>
  )
}
