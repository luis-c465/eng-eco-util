import { Label } from "#/ui/label";
import { Separator } from "#/ui/separator";
import { Slider } from "#/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useAtom } from "jotai";
import { scaleXAtom, scaleYAtom, store } from "./atom";


export default function ScaleSetter() {
  return (
    <div className="flex items-center p-4 h-full">
      <SingleScaleSetter
        atom={scaleXAtom}
        label="X Scale"
        min={10}
        max={100}
      />

      <Separator orientation="vertical" className="mx-5 h-full" />

      <SingleScaleSetter
        atom={scaleYAtom}
        label="Y Scale"
        min={1}
        max={80}
      />
    </div>
  )
}


type ScaleAtomType = typeof scaleXAtom | typeof scaleYAtom

type ScaleSetterProps = {
  atom: ScaleAtomType
  label: string
  max: number;
  min: number;
}
function SingleScaleSetter({ atom, label, max, min }: ScaleSetterProps) {
  const [scale, setScale] = useAtom(atom, { store })

  return (
    <div className="flex flex-col gap-2 space-x-2">
      <Label htmlFor="scaleX">
        {label}
      </Label>

      <div className="flex gap-2">
        <Slider
          className="w-[100px]"
          defaultValue={[scale]}
          max={max}
          min={min}
          step={1}
          onValueChange={([v]) => setScale(v)}
        />

        <Badge variant="outline">
          {scale}
        </Badge>
      </div>
    </div>
  )
}

// function ScaleXSetter() {
//   const [scaleX, setScaleX] = useAtom(scaleXAtom, { store })

//   return (
//     <div className="flex flex-col gap-2 space-x-2">
//       <Label htmlFor="scaleX">
//         Scale X
//       </Label>

//       <div className="flex gap-2">
//         <Slider
//           className="w-[100px]"
//           defaultValue={[scaleX]}
//           max={100}
//           min={10}
//           step={1}
//           onValueChange={([v]) => setScaleX(v)}
//         />

//         <Badge variant="outline">
//           {scaleX}
//         </Badge>
//       </div>
//     </div>
//   )
// }

// function ScaleYSetter() {
//   const [scale, setScale] = useAtom(scaleYAtom, { store })

//   return (
//     <div className="flex flex-col gap-2 space-x-2">
//       <Label htmlFor="scaleY">
//         Scale Y
//       </Label>

//       <div className="flex gap-2">
//         <Slider
//           id="scaleY"
//           className="w-[100px]"
//           defaultValue={[scale]}
//           max={100}
//           min={10}
//           step={1}
//           onValueChange={([v]) => setScale(v)}
//         />

//         <Badge variant="outline">
//           {scale}
//         </Badge>
//       </div>
//     </div>
//   )
// }
