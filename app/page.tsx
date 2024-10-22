import { redirect, RedirectType } from "next/navigation"


export default function IndexPage() {
  redirect("/table/10", RedirectType.replace)
}
