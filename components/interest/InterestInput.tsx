"use client"

import { useCallback, useState } from "react"
import { Input } from "#/ui/input"
import { Label } from "#/ui/label"
import { useSetAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { debounce, throttle } from "lodash-es"

import { interestAtom, store } from "./atom"

type InterestInputProps = {
  defaultInterest: number
}
export default function InterestInput({ defaultInterest }: InterestInputProps) {
  useHydrateAtoms([[interestAtom, defaultInterest / 100]], { store })

  const setRenderedI = useSetAtom(interestAtom, { store })
  const debouceSetI = useCallback(debounce(setRenderedI, 250), [])

  const [i, setI] = useState(defaultInterest)

  const onChange = useCallback(
    throttle((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setI(-1)
        return
      }

      const parsed = parseFloat(e.target.value)
      if (Number.isNaN(parsed)) return
      if (parsed < 0 || parsed > 100) return false

      setI(parsed)
      debouceSetI(parsed / 100)
    }, 50),
    []
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setRenderedI(i / 100)
      }
    },
    [i]
  )
  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor="interest">Interest</Label>
      <div className="flex gap-1 items-center">
        <Input
          onInput={onChange}
          onKeyDown={onKeyDown}
          value={i < 0 ? "" : i}
          type="number"
          id="interest"
          min={0}
          max={100}
          step={0.001}
          className="w-[125px] text-md"
        />
        <span>%</span>
      </div>
    </div>
  )
}
