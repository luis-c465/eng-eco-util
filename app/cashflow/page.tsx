"use client"


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "#/ui/resizable"


import { store } from "#/cashflow/atom"
import CashFlowDiagram from "#/cashflow/Diagram"
import ExportGroup from "#/cashflow/ExportGroup"
import CashFlowMaker from "#/cashflow/Maker"
import ScaleSetter from "#/cashflow/ScaleSetter"
import Page from "#/Page"
import { Provider } from "jotai"


export default function CashFlowPage() {
  return (
    <Page
      title="Cashflow Maker"
      description="Enter values to create a cashflow diagram"
    >
      <Provider store={store} >
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel defaultSize={45}>
            <CashFlowMaker />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={55}>
            <ResizablePanelGroup direction="vertical" className="flex-grow">
              <ResizablePanel defaultSize={6} maxSize={6} minSize={6}>
                <ScaleSetter />
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={88} maxSize={88} minSize={88}>
                <CashFlowDiagram />
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={6} maxSize={6} minSize={6}>
                <ExportGroup />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Provider>
    </Page>
  )
}
