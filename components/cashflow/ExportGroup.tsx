import { Button } from "#/ui/button"
import { Separator } from "#/ui/separator"
import svgToPngBlob from "@/lib/svg"
import { useAtomValue } from "jotai"
import { useCallback } from "react"
import { toast } from "sonner"
import { getSVGContentAtom } from "./Diagram"

export default function ExportGroup() {
  return (
    <div className="flex items-center p-4 h-full">
      <ExportAsSVG />

      <Separator orientation="vertical" className="mx-5 h-full" />

      <ExportAsPNG />
    </div>
  )
}

function ExportAsSVG() {
  const getSVGContent = useAtomValue(getSVGContentAtom)

  const handleClick = useCallback(() => {
    if (!getSVGContent) return

    const content = getSVGContent()
    navigator.clipboard.writeText(content)

    toast("Coppied to clipboard", {
      description: "The SVG of the cash flow diagram has been coppied to your clipboard.",
      dismissible: true
    })
  }, [getSVGContent])

  return (
    <Button variant="secondary" onClick={handleClick}>
      Export as SVG
    </Button>
  )
}


function ExportAsPNG() {
  const getSVGContent = useAtomValue(getSVGContentAtom)

  const handleClick = useCallback(async () => {
    if (!getSVGContent) return

    const content = getSVGContent()
    console.log("sus")
    const pngBlob = await svgToPngBlob(content)
    console.log(pngBlob)

    if (pngBlob === undefined) return;

    navigator.clipboard.write([
      new ClipboardItem({ "image/png": pngBlob }),
    ])

    toast("Coppied to clipboard", {
      description: "The image of the cash flow diagram has been coppied to your clipboard",
      dismissible: true,
    })
  }, [getSVGContent])

  return (
    <Button onClick={handleClick}>
      Export as PNG
    </Button>
  )
}
