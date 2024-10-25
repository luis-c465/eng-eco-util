"use client"

import { useAtomValue } from "jotai"
import { useHydrateAtoms } from "jotai/utils"

import { fullModeAtom, interestAtom, store } from "./atom"
import InterestPagination from "./InterestPagination"
import InterestNumberInput from "./NumberInput"

type InterestInputProps = {
  defaultInterest: number
}
export default function InterestInput({ defaultInterest }: InterestInputProps) {
  useHydrateAtoms([[interestAtom, defaultInterest / 100]], { store })
  const fullMode = useAtomValue(fullModeAtom, { store })

  return (
    <div>
      {fullMode ? (
        <InterestNumberInput defaultInterest={defaultInterest} />
      ) : (
        <InterestPagination />
      )}
    </div>
  )
}
