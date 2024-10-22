/**
 * List of atoms used in Cashflow pages and components
 */

import { atom, createStore, PrimitiveAtom } from "jotai"

export const store = createStore()

export const valueGroupsAtom = atom<PrimitiveAtom<number[]>[]>([
  atom([-100]),
  atom([10]),
  atom([10]),
  atom([10]),
  atom([10]),
  atom([10, 40]),
])

export const scaleXAtom = atom<number>(50)
export const scaleYAtom = atom<number>(3)
