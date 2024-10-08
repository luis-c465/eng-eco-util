import { range } from "lodash-es";

export default function CashFlow() {

}

function CashFlowEditor() {
  return (
    <div className="bg-black h-5 w-full relative">
      <div className="absolute top-0 left-0">
        <div className="flex gap-2">
          {range(0, 9).map((i) => (
            <div>
              {i}
            </div>
          )
          )}
        </div>

      </div>
    </div>
  )
}
