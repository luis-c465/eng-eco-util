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
import type { InterestTableData, RatioTypes } from "@/lib/calculate";
import { RATIO_PERCISION } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";


type InterestTableProps = {
  i: number;
  data: InterestTableData[]
}

export default function InterestTableRender({ i, data }: InterestTableProps) {
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
        {data.map((d, i) => (
          <Row {...d} key={i} highlight={i % 2 === 0}/>
        ))}
      </TableBody>
    </Table>
  )
}

function Row(data: InterestTableData & {'highlight': boolean}) {
  return (
    <TableRow className={cn(data.highlight && 'bg-muted/50')}>
      <TableCell className="font-medium">{data.n}</TableCell>

      <TableCellFormat num={data.FP} title="F/P" n={data.n} />
      <TableCellFormat num={data.PF} title="P/F" n={data.n} />

      <TableCellFormat num={data.AF} title="P/F" n={data.n} />
      <TableCellFormat num={data.AP} title="P/F" n={data.n} />
      <TableCellFormat num={data.FA} title="F/A" n={data.n} />
      <TableCellFormat num={data.PA} title="P/A" n={data.n} />

      <TableCellFormat num={data.AG} title="A/G" n={data.n} />
      <TableCellFormat num={data.PG} title="P/G" n={data.n} />
      <TableCellFormat num={data.FG} title="F/G" n={data.n} />
    </TableRow>
  )
}


type TableCellFormatProps = {
  num: number,
  title: string,
  n: number
}
function TableCellFormat({ num, title, n }: TableCellFormatProps) {

  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(num.toString())

    toast(
      `Coppied ${title}, n=${n} to clipboard`,
      { description: num.toString(), dismissible: true }
    )
  }, [num, title, n])

  const percision = useMemo(() => {
    const mappedTitle = title.replace("/", "") as RatioTypes
    return RATIO_PERCISION[mappedTitle];
  }, [title])

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
