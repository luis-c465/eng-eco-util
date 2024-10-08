"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "#/ui/table";
import * as calc from "@/lib/calculate";
import { cn } from "@/lib/utils";
import { range } from "lodash-es";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

type InterestTableData = {
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

type InterestTableProps = {
  i: number;
}

export default function InterestTable({ i }: InterestTableProps) {
  const interestTableData = useMemo<InterestTableData[]>(() => (
    range(1, 500 + 1).map((n) => ({
      n: n,

      FP: calc.FP(i, n),
      PF: calc.PF(i, n),

      FA: calc.FA(i, n),
      AF: calc.AF(i, n),
      AP: calc.AP(i, n),
      PA: calc.PA(i, n),

      AG: calc.AG(i, n),
      PG: calc.PG(i, n),
      FG: calc.FG(i, n),
    }))
  ), [i])

  return (
    <Table>
      <TableCaption>{i * 100}%</TableCaption>
      <TableHeader>
        <TableRow>
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
        {interestTableData.map((data, i) => (
          <Row {...data} key={i} dark={i % 2 === 0}/>
        ))}
      </TableBody>
    </Table>
  )
}

function Row(data: InterestTableData & {'dark': boolean}) {
  return (
    <TableRow className={cn(data.dark && 'bg-muted/100')}>
      <TableCell className="font-medium">{data.n}</TableCell>

      <TableCellFormat num={data.FP} percision={3} title="F/P" n={data.n} />
      <TableCellFormat num={data.PF} percision={4} title="P/F" n={data.n} />

      <TableCellFormat num={data.AF} percision={4} title="P/F" n={data.n} />
      <TableCellFormat num={data.AP} percision={4} title="P/F" n={data.n} />
      <TableCellFormat num={data.FA} percision={3} title="F/A" n={data.n} />
      <TableCellFormat num={data.PA} percision={3} title="P/A" n={data.n} />

      <TableCellFormat num={data.AG} percision={3} title="A/G" n={data.n} />
      <TableCellFormat num={data.PG} percision={3} title="P/G" n={data.n} />
      <TableCellFormat num={data.FG} percision={3} title="F/G" n={data.n} />
    </TableRow>
  )
}


function TableCellFormat({ num, percision, title, n }: { num: number, percision: number, title: string, n: number }) {

  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(num.toString())

    toast(
      `Coppied ${title}, n=${n} to clipboard`,
      { description: num.toString(), dismissible: true }
    )
  }, [num, title, n])

  return (
    <TableCell onClick={onClick} className="px-0">
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
