"use client"
import { type PrimitiveAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { scaleXAtom, scaleYAtom, store } from "./atom";
import { svgHeightAtom } from "./Diagram";
import { useStrokeColor } from "./hooks";

export const arrowWidth = 10;

type ArrowGroupProps = {
  atom: PrimitiveAtom<number[]>
  index: number
}
export default function ArrowGroup({ atom, index }: ArrowGroupProps) {
  const values = useAtomValue(atom, { store });
  const valuesWithY = useMemo(() => addYToValues(values), [values])

  return (
    <g>
      {valuesWithY.map(({value, y}, i) => (
        <Arrow
          x={index}
          y={y}
          value={value}
          key={i}
        />
      ))}
    </g>
  )
}

type ArrowProps = {
  x: number,
  y: number,
  value: number,
}
function Arrow({ x, y, value }: ArrowProps) {
  if (value === 0) return null;

  const scaleX = useAtomValue(scaleXAtom)
  const scaleY = useAtomValue(scaleYAtom)
  const svgHeight = useAtomValue(svgHeightAtom, { store });
  const stroke = useStrokeColor()

  const isPositive = value > 0;

  const scaledX = x * scaleX + 50;
  const scaledY = -y * scaleY + svgHeight / 2;
  const scaledValue = value * scaleY
  const arrowTipY = (scaledY - scaledValue);


  return (
    <g key={`${x}-${y}-${value}`}>
      {/* Line (arrow shaft) */}
      <line
        x1={scaledX}
        y1={scaledY}
        x2={scaledX}
        y2={arrowTipY}
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Arrow head */}
      {isPositive ? (
        <polyline
          points={`${scaledX - arrowWidth},${arrowTipY + arrowWidth} ${scaledX},${arrowTipY} ${scaledX + arrowWidth},${arrowTipY + arrowWidth}`}
          fill={stroke}
        />
      ) : (
        <polyline
          points={`${scaledX - arrowWidth},${arrowTipY - arrowWidth} ${scaledX},${arrowTipY} ${scaledX + arrowWidth},${arrowTipY - arrowWidth}`}
          fill={stroke}
        />
      )}
      {/* Value text */}
      <text
        x={scaledX + arrowWidth * 2 - 10}
        y={isPositive ? arrowTipY + 10 : arrowTipY + 5}
        fontSize="15"
        fill={stroke}
        fontFamily="monospace"
      >
        {Math.abs(value)}
      </text>
    </g>
  )
}


type ValueWithY = {
  value: number,
  y: number
}
function addYToValues(values: number[]): ValueWithY[]  {
  let sumPos = 0;
  let sumNeg = 0;

  return values.map((v) => {
    if (v >= 0) {
      const oldSumPos = sumPos;
      sumPos += v;
      return {
        value: v,
        y: oldSumPos
      }
    } else {
      const oldSumNeg = sumNeg;
      sumNeg += v;
      return {
        value: v,
        y: oldSumNeg
      }
    }
  })
}
