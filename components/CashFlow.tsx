import { range } from "lodash-es";

export default function CashFlow() {
  return (
    <div className="w-full">
      <CashFlowEditor />
    </div>
  )
}

function CashFlowEditor() {
  return (
    <div className="bg-black h-[2px] w-full relative">
      <div className="absolute top-[4px] left-[10px]">
        <div className="flex gap-[20px]">
          {range(0, 20).map((i) => (
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
