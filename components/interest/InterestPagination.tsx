"use client"

import { useCallback, useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "#/ui/pagination"
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { round } from "lodash-es"

import { INTEREST_VALUES } from "@/lib/config"
import { cn } from "@/lib/utils"

import { interestAtom, store } from "./atom"

const indexAtom = atom(
  (get) => {
    const interest = get(interestAtom)
    return INTEREST_VALUES.findIndex((val) =>
      withinDistance(val, interest * 100, 1 / 10)
    )
  },
  (_get, set, index: number) => {
    set(interestAtom, round(INTEREST_VALUES[index] / 100, 5))
  }
)

// Atom which increments the index by a given amount
const updateIndexAtom = atom(null, (get, set, increment: number) => {
  const index = get(indexAtom)
  const newVal = index + increment
  console.log(newVal, "Num interest", NUM_INTEREST_VALUES)

  if (newVal > NUM_INTEREST_VALUES - 1 || newVal < 0) {
    return
  }
  set(indexAtom, newVal)
})

const NUM_INTEREST_VALUES = INTEREST_VALUES.length

export default function InterestPagination() {
  const index = useAtomValue(indexAtom, { store })
  const incrementIndex = useSetAtom(updateIndexAtom, { store })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // console.log(e.code, e.code === "ArrowLeft")

      if (e.code == "ArrowLeft") {
        console.log("left")
        e.preventDefault()
        incrementIndex(-1)
      }

      if (e.code == "ArrowRight") {
        console.log("right")
        e.preventDefault()
        incrementIndex(1)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Pagination>
      <PaginationContent>
        <PreviousInterestBtn />

        {INTEREST_VALUES.map((value, i) => (
          <Item
            key={value}
            value={value}
            index={i}
            visible={
              (index <= 1 && i < 5) ||
              (index >= NUM_INTEREST_VALUES - 3 &&
                i > NUM_INTEREST_VALUES - 6) ||
              (i >= index - 2 && i <= index + 2)
            }
          />
        ))}

        <NextInterestBtn />
      </PaginationContent>
    </Pagination>
  )
}

function NextInterestBtn() {
  const [index, setIndex] = useAtom(indexAtom, { store })

  const onNextClick = useCallback(() => {
    console.log("jop", index, INTEREST_VALUES[index])
    if (index >= NUM_INTEREST_VALUES - 1) return
    setIndex(index + 1)
  }, [index])

  return (
    <PaginationItem onClick={onNextClick}>
      <PaginationNext
        className={cn(
          index === NUM_INTEREST_VALUES - 1 && "text-accent hover:text-accent"
        )}
        href="#"
      />
    </PaginationItem>
  )
}

function PreviousInterestBtn() {
  const [index, setIndex] = useAtom(indexAtom, { store })

  const onNextClick = useCallback(() => {
    if (index === 0) return
    setIndex(index - 1)
  }, [index])

  return (
    <PaginationItem onClick={onNextClick}>
      <PaginationPrevious
        className={cn(index === 0 && "text-accent hover:text-accent")}
        href="#"
      />
    </PaginationItem>
  )
}

type ItemProps = {
  value: number
  index: number
  visible: boolean
}
function Item({ value, visible, index }: ItemProps) {
  const [curIndex, setIndex] = useAtom(indexAtom, { store })
  const onClick = useCallback(() => setIndex(index), [])

  if (!visible) return null

  return (
    <PaginationItem onClick={onClick}>
      <PaginationLink
        href="#"
        isActive={index === curIndex}
        className="!w-[60px]"
      >
        {value}%
      </PaginationLink>
    </PaginationItem>
  )
}

/**
 * Returns true if `a` and `b` are within `distance` of each other.
 */
function withinDistance(a: number, b: number, distance = 1) {
  return Math.abs(b - a) <= distance
}
