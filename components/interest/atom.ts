"use client"

import { atom, createStore } from "jotai"

export const store = createStore()
export const interestAtom = atom(10)
export const fullModeAtom = atom(true)
