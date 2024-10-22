import { Canvg } from 'canvg';
import { defer } from 'lodash-es';


export default async function svgToPngBlob(svg: string): Promise<Blob | undefined> {
  const canvas = document.createElement("canvas")
  // Defer deleting the child
  defer(() => canvas.remove())

  // Hide the canvas
  canvas.hidden = true;
  canvas.style.display = "none"

  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  if (!ctx) return;

  const can = await Canvg.from(ctx, svg)
  can.render()

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject("Could not convert to blob")
      }

      resolve(blob!)
    }, "image/png")
  })
}
