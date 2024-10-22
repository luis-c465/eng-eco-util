"use client"

import useMounted from "@/hooks/useMounted";
import { atom, useAtomValue } from "jotai";
import { range } from "lodash-es";
import { scaleXAtom, store, valueGroupsAtom } from "./atom";
import { svgHeightAtom } from "./Diagram";
import { useStrokeColor } from "./hooks";

const VERTICAL_LINE_WIDTH = 2;
const VERTICAL_LINE_HEIGHT = 5;

const valuesLengthAtom = atom((get) => get(valueGroupsAtom).length)

export default function NumberLine() {
  const mounted = useMounted()
  const valuesLength = useAtomValue(valuesLengthAtom);

  if (!mounted) return null;
  return (
    <g>
      <g>
        {range(valuesLength).map(i => (
          <NumberLineItem key={i} index={i} />
        ))}
      </g>

      <NumberLineLength length={valuesLength} />
    </g>
  )
}

type NumberLineLengthProps = {
  length: number
}
function NumberLineLength({length}: NumberLineLengthProps) {
  const scaleX = useAtomValue(scaleXAtom)
  const svgHeight = useAtomValue(svgHeightAtom, {store})
  const stroke = useStrokeColor()
  console.log(stroke)

  return (
    <line
      x1={50}
      x2={(length - 1) * scaleX + 50}
      y1={svgHeight / 2}
      y2={svgHeight / 2}
      stroke={stroke}
      strokeWidth={VERTICAL_LINE_WIDTH}
    />
  )
}

function NumberLineItem({ index }: { index: number }) {
  const stroke = useStrokeColor()

  const svgHeight = useAtomValue(svgHeightAtom, {store})
  const scaleX = useAtomValue(scaleXAtom)
  const scaledX = index * scaleX + 50;

  const scaledY = svgHeight / 2

  return (
    <g>
      <line
        x1={scaledX}
        y1={scaledY - VERTICAL_LINE_HEIGHT}
        x2={scaledX}
        y2={scaledY + VERTICAL_LINE_HEIGHT}
        stroke={stroke}
        strokeWidth={VERTICAL_LINE_WIDTH}
      />

      <text
        x={scaledX - 12}
        y={scaledY + VERTICAL_LINE_HEIGHT + 10}
        fontSize="16"
        fill={stroke}
        fontFamily="monospace"
      >
        {index}
      </text>
    </g>
  )
}
