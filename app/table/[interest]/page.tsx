import { notFound } from "next/navigation"
import { store } from "#/interest/atom"
import InterestFinderSheet from "#/interest/FinderSheet"
import FullModeSwitch from "#/interest/FullModeSwitch"
import InterestInput from "#/interest/InterestInput"
import InterestTable from "#/interest/Table"
import Page from "#/Page"
import { Provider } from "jotai"
import { round } from "lodash-es"

export default function TablePage({
  params: { interest },
}: {
  params: { interest: string }
}) {
  const defaultInterest = round(parseFloat(interest), 3)
  if (
    Number.isNaN(defaultInterest) ||
    0 > defaultInterest ||
    100 < defaultInterest
  ) {
    return notFound()
  }

  return (
    <Page
      title="Interest Table"
      description="Enter an interest rate in the textbox below to update the table"
    >
      <Provider store={store}>
        <div className="grid w-full max-w-sm items-center gap-1.5 ">
          <div className="flex gap-10 items-center relative">
            <InterestInput defaultInterest={defaultInterest} />

            <FullModeSwitch />

            <InterestFinderSheet />
          </div>
        </div>

        <InterestTable />
      </Provider>
    </Page>
  )
}
