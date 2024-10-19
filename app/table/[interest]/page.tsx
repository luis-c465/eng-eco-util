"use client"

import InterestFinderSheet from "#/interest/FinderSheet";
import InterestTableRender from "#/interest/TableRender";
import Page from "#/Page";
import { Input } from "#/ui/input";
import { Label } from "#/ui/label";
import { Switch } from "@/components/ui/switch";
import { calculateValues } from "@/lib/calculate";
import { N_VALUES } from "@/lib/config";
import { atom, createStore, useAtom } from "jotai";
import { debounce, memoize, range, round, throttle } from "lodash-es";
import { notFound } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useCallback, useMemo, useState } from "react";

export const store = createStore()
export const fullModeAtom = atom(false)

const calculate = memoize(calculateValues, (i, n) => `${i}, ${n}`)

export default function TablePage({ params: { interest } }: { params: { interest: string } }) {
  const defaultInterest = round(parseFloat(interest), 3);

  if (Number.isNaN(defaultInterest) || 0 > defaultInterest || 100 < defaultInterest) {
    return notFound()
  }

  const [fullMode, setFullMode] = useAtom(fullModeAtom, {store});
  const [i, setI] = useState(defaultInterest);
  const [renderedI, setRenderedI] = useState(defaultInterest / 100);

  const values = useMemo(() => {
    if (fullMode) {
      return calculate(renderedI, range(1, 500 + 1))
    } else
    {
      return calculate(renderedI, N_VALUES)
    }
  }, [renderedI, fullMode])

  const debouceSetI = useCallback(debounce(setRenderedI, 250), [])

  const onChange = useCallback(throttle((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "")
    {
      setI(-1);
      return;
    }

    const parsed = parseFloat(e.target.value);
    console.log(e.target.value)
    if (Number.isNaN(parsed)) return;
    if (parsed < 0 || parsed > 100) return false;

    setI(parsed)
    debouceSetI(parsed / 100)
  }, 50), [])

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
    {
      setRenderedI(i / 100);
    }
  }, [i])

  return (
    <Page
      title="Interest Table"
      description="Enter an interest rate in the textbox below to update the table"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <div className="flex gap-10 items-center">
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

          <div className="flex gap-2 items-center">
            <Switch
              defaultChecked={fullMode}
              onCheckedChange={setFullMode}
              id="full-mode"
            />
            <Label htmlFor="full-mode">Full mode</Label>
          </div>

          <InterestFinderSheet />
        </div>
      </div>

      <InterestTableRender i={renderedI} data={values} />
    </Page>
  )
}
