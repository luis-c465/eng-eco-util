/**
 * List of atoms used in Cashflow pages and components
 */

import { atom, createStore, PrimitiveAtom } from "jotai"

export const store = createStore()

export const valueGroupsAtom = atom<PrimitiveAtom<number[]>[]>([
  atom([0]),
  atom([1]),
  atom([2]),
  atom([3]),
  atom([4]),
  atom([5, 4, -5, -5, -6]),
])

export const scaleXAtom = atom<number>(30)
export const scaleYAtom = atom<number>(10)
