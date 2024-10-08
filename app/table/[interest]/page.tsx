"use client"

import InterestTable from "#/InterestTable";
import { Input } from "#/ui/input";
import { Label } from "#/ui/label";
import { debounce, round, throttle } from "lodash-es";
import { notFound } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

export default function TablePage({params: {interest}}: {params: { interest: string}}) {
  const defaultInterest = round(parseFloat(interest), 3);

  if (Number.isNaN(defaultInterest) || 0 > defaultInterest || 100 < defaultInterest) {
    return notFound()
  }

  const [i, setI] = useState(defaultInterest);
  const [renderedI, setRenderedI] = useState(defaultInterest / 100);

  const debouceSetI = useCallback(debounce(setRenderedI, 250), [])

  const onChange = useCallback(throttle((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
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
    if (e.key === "Enter") {
      setRenderedI(i / 100);
    }
  }, [i])

  // const router = useRouter();

  // useEffect(() => {
  //   router.push({
  //     pathname: "/table/[interest]",
  //      query: {
  //        interest: i.toString()
  //      }
  //     },
  //     `/table/${i}`,
  //     { shallow: true }
  //   )
  // }, [i])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Interest Table <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Enter an interest rate in the textbox below to update the table
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5 ">
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
              className="max-w-[100px] text-md"
            />
            <span>%</span>

          </div>
        </div>

        <InterestTable i={renderedI} />
      </div>
    </section>
  )
}
