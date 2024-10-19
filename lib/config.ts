import { type RatioTypes } from "@/lib/calculate"

export const INTEREST_VALUES = [
  1/8,
  1/4,
  3 / 8,
  1 / 2,
  5 / 8,
  3 / 4,
  7 / 8,
  1,
  1 + 1 / 8,
  1 + 1 / 4,
  1 + 3 / 8,
  1 + 1 / 2,
  1 + 5 / 8,
  1 + 3 / 4,
  1 + 7 / 8,
  2,
  2 + 1 / 4,
  2 + 1 / 2,
  2 + 3 / 4,
  3,
  3 + 1 / 4,
  3 + 1 / 2,
  3 + 3 / 4,
  4,
  5,
  5 + 1 / 2,
  6,
  6 + 1 / 2,
  7,
  7 + 1 / 2,
  8,
  8 + 1 / 2,
  9,
  9 + 1 / 2,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  18,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
  55,
  60
]

export const INTEREST_FULL_STEP = 0.001

export const N_VALUES = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  40,
  45,
  48,
  50,
  55,
  60,
  70,
  72,
  80,
  84,
  90,
  96,
  100,
  104,
  120,
  125,
  130,
  135,
  140,
  145,
  150,
  200,
  240,
  300
]

export const RATIO_PERCISION: Record<RatioTypes, number> = {
  FP: 3,
  PF: 4,

  AF: 4,
  AP: 4,
  FA: 3,
  PA: 3,

  AG: 3,
  PG: 3,
  FG: 3
}