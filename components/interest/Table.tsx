"use client"

import { useCallback, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/ui/table"
import { useAtomValue } from "jotai"
import { range } from "lodash-es"
import { toast } from "sonner"

import {
  calculateValues,
  type InterestTableData,
  type RatioTypes,
} from "@/lib/calculate"
import { N_VALUES, RATIO_PERCISION } from "@/lib/config"
import { cn } from "@/lib/utils"

import { fullModeAtom, interestAtom, store } from "./atom"

export default function InterestTable() {
  const i = useAtomValue(interestAtom, { store })
  const fullMode = useAtomValue(fullModeAtom, { store })

  const values = useMemo(() => {
    if (fullMode) {
      return calculateValues(i, range(1, 500 + 1))
    } else {
      return calculateValues(i, N_VALUES)
    }
  }, [i, fullMode])

  return (
    <Table className="h-full !overflow-[initial]">
      <TableCaption>{i * 100}%</TableCaption>
      <TableHeader className="sticky top-[65px]">
        <TableRow className="bg-muted">
          <TableHead className="w-[30px] font-bold">n</TableHead>

          <TableHead>F/P</TableHead>
          <TableHead>P/F</TableHead>

          <TableHead>A/F</TableHead>
          <TableHead>A/P</TableHead>
          <TableHead>F/A</TableHead>
          <TableHead>P/A</TableHead>

          <TableHead>A/G</TableHead>
          <TableHead>P/G</TableHead>
          <TableHead>F/G</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {values.map((d, i) => (
          <Row {...d} key={i} highlight={i % 2 === 0} />
        ))}
      </TableBody>
    </Table>
  )
}

function Row(data: InterestTableData & { highlight: boolean }) {
  return (
    <TableRow className={cn(data.highlight && "bg-muted/50")}>
      <TableCell className="font-medium">{data.n}</TableCell>

      <TableCellFormat num={data.FP} title="F/P" n={data.n} />
      <TableCellFormat num={data.PF} title="P/F" n={data.n} />

      <TableCellFormat num={data.AF} title="A/F" n={data.n} />
      <TableCellFormat num={data.AP} title="A/P" n={data.n} />
      <TableCellFormat num={data.FA} title="F/A" n={data.n} />
      <TableCellFormat num={data.PA} title="P/A" n={data.n} />

      <TableCellFormat num={data.AG} title="A/G" n={data.n} />
      <TableCellFormat num={data.PG} title="P/G" n={data.n} />
      <TableCellFormat num={data.FG} title="F/G" n={data.n} />
    </TableRow>
  )
}

type TableCellFormatProps = {
  num: number
  title: string
  n: number
}
function TableCellFormat({ num, title, n }: TableCellFormatProps) {
  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(num.toString())

    toast(`Coppied ${title}, n=${n} to clipboard`, {
      description: num.toString(),
      dismissible: true,
    })
  }, [num, title, n])

  const percision = useMemo(() => {
    const mappedTitle = title.replace("/", "") as RatioTypes
    return RATIO_PERCISION[mappedTitle]
  }, [title])

  return (
    <TableCell
      onClick={onClick}
      className="px-0 dark:hover:bg-slate-800 hover:bg-slate-200 transition-colors duration-300 p-2"
    >
      {formatNumber(num, percision)}
    </TableCell>
  )
}

function formatNumber(num: number, percision: number): string {
  if (num >= 10_000_000) {
    return num.toExponential(percision)
  } else {
    return num.toFixed(percision)
  }
}
