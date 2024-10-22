"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "#/ui/table"



import { Button } from "#/ui/button"
import { Input } from "#/ui/input"
import { atom, type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { splitAtom } from "jotai/utils"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import { memo, useCallback } from "react"
import { store, valueGroupsAtom } from "./atom"


const addAtom = atom(null, (_get, set) => {
  const newAtom = atom([0])
  set(valueGroupsAtom, (prev) => [
    ...prev,
    newAtom
  ])
})

const deleteValueAtom = atom(null, (_get, set, atom: PrimitiveAtom<number[]>) => {
  set(valueGroupsAtom, (p) => p.filter(i => i !== atom))
})

export default function CashFlowMaker() {
  const values = useAtomValue(valueGroupsAtom, { store })

  const add = useSetAtom(addAtom)
  const deleteAtom = useSetAtom(deleteValueAtom)

  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Year</TableHead>
            <TableHead>Amounts</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {values.map((atom, i) => (
            <TableRow key={`${atom}`}>
              <TableCell>
                {i}
              </TableCell>

              <TableCell>
                <ValueEditorMemoized
                  atom={atom}
                  deleteSelf={() => deleteAtom(atom)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={add} className="m-4" variant="secondary">
        <PlusIcon />
        Add new year
      </Button>
    </div>
  )
}

type ValueEditorProps = {
  atom: PrimitiveAtom<number[]>
  deleteSelf: () => void
}
function ValueEditor({ atom, deleteSelf }: ValueEditorProps) {
  const sAtom = splitAtom(atom)
  const [amounts, setAmounts] = useAtom(sAtom, { store })

  const addOne = useCallback(() => {
    setAmounts({
      "type": "insert",
      "value": 0,
    })
  }, [setAmounts])

  const removeOne = useCallback(() => {
    setAmounts({
      "type": "remove",
      "atom": amounts[amounts.length - 1],
    })
  }, [amounts])

  return (
    <div className="flex gap-2 justify-between w-full">
      <div className="flex gap-2 items-start">
        {amounts.map((atom, i) => (
          <ValueInput atom={atom} key={`${atom}`} />
        ))}

      </div>

      <div className="self-end ml-5 flex gap-2">
        <Button
          className="ml-auto"
          onClick={addOne}
          variant="outline"
          size="icon"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>

        <Button
          onClick={removeOne}
          variant="outline"
          size="icon"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>

        <Button
          onClick={deleteSelf}
          variant="secondary"
          size="icon"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>

      </div>

    </div>
  )
}

const ValueEditorMemoized = memo(
  ValueEditor,
  ({ atom: atomOld }, { atom: atomNew }) => (atomOld === atomNew)
);

type ValueInputProps = {
  atom: PrimitiveAtom<number>
}
function ValueInput({ atom }: ValueInputProps) {
  const [amount, setAmount] = useAtom(atom, { store });

  return (
    <Input
      className="w-20 overflow-x-scroll arrow-hide"
      defaultValue={amount}
      onChange={e => setAmount(+e.target.value)}
      type="number"
      inputMode="numeric"
      step={0.01}
    />
  )
}
