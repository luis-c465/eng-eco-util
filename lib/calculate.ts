import { INTEREST_FULL_STEP, RATIO_PERCISION } from "@/lib/config";
import { memoize, round } from "lodash-es";

export function FP(i: number, n: number) {
  return (1 + i) ** n
}

export function PF(i: number, n: number) {
  return (1 + i) ** (-n)
}

export function FA(i: number, n: number) {
  return ((1 + i) ** n - 1) / i;
}

export function AF(i: number, n: number) {
  return (i) / ((1 + i) ** n - 1);
}

export function AP(i: number, n: number) {
  return (i * (1 + i) ** n) / ((1 + i) ** n - 1)
}

export function PA(i: number, n: number) {
  return ((1 + i) ** n - 1) / (i * (1 + i) ** n);
}

export function AG(i: number, n: number) {
  return ((1 + i) ** n - i * n - 1) / (i * (1 + i) ** n - i)
}

export function PG(i: number, n: number) {
  return ((1 + i) ** n - i * n - 1) / (i ** 2 * (1 + i) ** n)
}

export function FG(i: number, n: number) {
  return PG(i, n) * FP(i, n);
}

export const RATIOS = {
  FP,
  PF,

  FA,
  AF,
  AP,
  PA,

  AG,
  PG,
  FG
}

export type RatioTypes = keyof typeof RATIOS;

export type InterestTableData = {
  n: number;

  FP: number;
  PF: number;

  FA: number;
  AF: number
  AP: number;
  PA: number;

  AG: number;
  PG: number;
  FG: number;
}

export function calculateValues(i: number, n_array: number[]): InterestTableData[] {
  return n_array.map(n => ({
    n: n,

    FP: FP(i, n),
    PF: PF(i, n),

    FA: FA(i, n),
    AF: AF(i, n),
    AP: AP(i, n),
    PA: PA(i, n),

    AG: AG(i, n),
    PG: PG(i, n),
    FG: FG(i, n),
  }))
}


export function calculateInterest(
  i_array: number[],
  n: number,
  targetRatio: number,
  ratioType: RatioTypes
): number {
  const roundNumber = (n: number) =>
    round(n, RATIO_PERCISION[ratioType])
  const calc = memoize((i: number) =>
    roundNumber(RATIOS[ratioType](i / 100, n)))

  const low = calc(i_array[0])
  const high = calc(i_array[i_array.length - 1]);
  const ascending = low <= high;

  function recursive(low_i: number, high_i: number) {
    if (high_i < low_i) return -1;

    console.log(low_i, high_i)

    const mid_i = Math.floor((low_i + high_i) / 2);
    const mid_interest = i_array[mid_i];
    const mid = calc(mid_interest)

    if (mid === targetRatio) return mid;

    if (low_i + 1 === high_i) {
      const i_low = i_array[low_i];
      const i_high = i_array[high_i];

      const i_low_val = calc(i_low);
      const i_high_val = calc(i_high);

      const delta_1 = Math.abs(targetRatio - i_low_val);
      const delta_2 = Math.abs(i_low_val - i_high_val);

      const i_diff = i_high - i_low;

      const delta_i = (delta_1 / delta_2) * i_diff

      return i_low + delta_i;
    }

    console.log({mid, mid_i, mid_interest, low: i_array[low_i], high: i_array[high_i]})

    if (ascending ? mid > targetRatio : mid < targetRatio) {
      return recursive(low_i, mid_i);
    } else {
      return recursive(mid_i, high_i);
    }
  }

  return recursive(0, i_array.length -1)
}


export function calculateInterestFull(
  n: number,
  targetRatio: number,
  ratioType: keyof typeof RATIOS,
): number {
  const calc = memoize((i: number) =>
    (RATIOS[ratioType](i / 100, n)))

  const low = calc((1/8) / 100)
  const high = calc(60 / 100);
  const ascending = low <= high;

  function recursive(low: number, high: number) {
    if (high < low) return -1;

    console.log(low, high)

    const mid_i = (low + high) / 2;
    const mid = calc(mid_i)

    if (mid === targetRatio) return mid;

    const delta_i = Math.abs(high - low)
    if (delta_i < INTEREST_FULL_STEP) {
      const i_low_val = calc(low);
      const i_high_val = calc(high);

      const delta_1 = Math.abs(targetRatio - i_low_val);
      const delta_2 = Math.abs(i_low_val - i_high_val);

      const delta = (delta_1 / delta_2) * delta_i

      return low + delta;
    }

    console.log({mid, mid_i, low, high})

    if (ascending ? mid > targetRatio : mid < targetRatio) {
      return recursive(low, mid_i);
    } else {
      return recursive(mid_i, high);
    }
  }

  return recursive(0, 100)
}
