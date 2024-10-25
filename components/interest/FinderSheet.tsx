"use client"

import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { fullModeAtom, store } from "#/interest/atom"
import { Button } from "#/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "#/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/ui/sheet"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { round } from "lodash-es"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { useForm, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  calculateInterest,
  calculateInterestFull,
  RatioTypes,
} from "@/lib/calculate"
import { INTEREST_VALUES, RATIO_PERCISION } from "@/lib/config"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"

const foundInterestAtom = atom(-2)

const INTEREST_TABLE_RATIOS = [
  "F/P",
  "P/F",

  "F/A",
  "A/F",
  "A/P",
  "P/A",

  "A/G",
  "P/G",
  "F/G",
]

const formSchema = z.object({
  value: z.coerce.number().min(0),
  ratio_type: z.string().refine((v) => INTEREST_TABLE_RATIOS.includes(v)),
  n: z.coerce.number().min(0).max(1_000),
})

export default function InterestFinderSheet() {
  const setFoundInterest = useSetAtom(foundInterestAtom, { store })

  function onSheetOpenChange(open: boolean) {
    if (!open) {
      setFoundInterest(-2)
    }
  }

  return (
    <Sheet onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-[100px]">
          Find i%
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Find Interest Rate</SheetTitle>
          <SheetDescription>
            Find the interest rate for a given ratio & value.
          </SheetDescription>

          <Content />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

function Content() {
  const setFoundInterest = useSetAtom(foundInterestAtom, { store })
  const fullMode = useAtomValue(fullModeAtom, { store })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit({ value, ratio_type, n }: z.infer<typeof formSchema>) {
    const ratio_type_mapped = ratio_type.replace("/", "") as RatioTypes
    const percision_mapped = RATIO_PERCISION[ratio_type_mapped]

    let found = -1
    if (!fullMode) {
      found = calculateInterest(INTEREST_VALUES, n, value, ratio_type_mapped)
    } else {
      found = calculateInterestFull(n, value, ratio_type_mapped)
    }

    console.log("found", found)

    found = round(found, percision_mapped)
    setFoundInterest(found)
  }

  return (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-2 justify-between">
            <RatioValueInput form={form} />

            <RatioNInput form={form} />
          </div>

          <RatioTypeInput form={form} />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <ShowFoundInterest />
    </div>
  )
}

function ShowFoundInterest() {
  const foundInterest = useAtomValue(foundInterestAtom, { store })
  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(foundInterest.toString())

    toast(`Coppied found interest value to clipboard`, {
      description: foundInterest.toString(),
      dismissible: true,
    })
  }, [foundInterest])

  if (foundInterest === -2) {
    return null
  }

  if (foundInterest === -1) {
    return <div className="text-red-500">No interest found</div>
  }

  return (
    <div onClick={onClick}>
      Found Interest:
      <strong className="ml-1">{foundInterest}%</strong>
    </div>
  )
}

type FormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

function RatioValueInput({ form }: FormProps) {
  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem className="flex flex-col h-full">
          <FormLabel>Value</FormLabel>
          <FormControl>
            <Input
              type="number"
              step={0.001}
              min={0}
              placeholder="0"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function RatioNInput({ form }: FormProps) {
  return (
    <FormField
      control={form.control}
      name="n"
      render={({ field }) => (
        <FormItem className="flex flex-col h-full">
          <FormLabel>N</FormLabel>
          <FormControl>
            <Input
              type="number"
              step={1}
              min={0}
              max={1_000}
              placeholder="0"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function RatioTypeInput({ form }: FormProps) {
  return (
    <FormField
      control={form.control}
      name="ratio_type"
      render={({ field }) => (
        <FormItem className="flex flex-col h-full w-full">
          <FormLabel>Ratio Type</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? INTEREST_TABLE_RATIOS.find(
                        (language) => language === field.value
                      )
                    : "Select Ratio"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No Ratio Type Found</CommandEmpty>
                  <CommandGroup>
                    {INTEREST_TABLE_RATIOS.map((language) => (
                      <CommandItem
                        value={language}
                        key={language}
                        onSelect={() => {
                          form.setValue("ratio_type", language)
                        }}
                      >
                        {language}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            language === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
