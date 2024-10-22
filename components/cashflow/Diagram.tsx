"use client"

import useMounted from "@/hooks/useMounted";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import ArrowGroup from "./ArrowGroup";
import { store, valueGroupsAtom } from "./atom";
import NumberLine from "./NumberLine";

export const svgHeightAtom = atom(0);
export const getSVGContentAtom = atom<() => string>()

export default function CashFlowDiagram() {
  const setHeight = useSetAtom(svgHeightAtom, {store});
  const heightRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const setGetSVGContent = useSetAtom(getSVGContentAtom)

  useEffect(() => {
    const handleResize = () => {
      setHeight((heightRef.current!).offsetHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [heightRef]);

  useEffect(() => {
    if (!svgRef.current) return;
    if (!heightRef.current) return;

    setGetSVGContent(() => () => {
      const svgCurrent = svgRef.current;
      const wrapperCurrent = heightRef.current
      if (!svgCurrent || !wrapperCurrent) throw new Error("No current svg");

      const sv = wrapperCurrent.getBoundingClientRect();

      let html = svgRef.current?.outerHTML as string;
      html = html.replace(`width="100%"`, `width="${sv.width}"`)
      html = html.replace(`height="100%"`, `height="${sv.height}"`)

      return html
    })
  }, [svgRef, heightRef])

  return (
    <div className="w-full h-full" ref={heightRef}>
      <svg ref={svgRef} width="100%" height="100%" className="w-full h-full">
        <Arrows />

        <NumberLine />
      </svg>

    </div>
  )
}

function Arrows() {
  const mounted = useMounted()
  const valueGroups = useAtomValue(valueGroupsAtom, {store})

  if (!mounted) return null;

  return (
    <g>
      {valueGroups.map((atom, i) => (
        <ArrowGroup key={i} atom={atom} index={i} />
      ))}
    </g>
  )
}
