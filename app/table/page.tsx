import { redirect, RedirectType } from "next/navigation"


export default function TablePage() {
  redirect("/table/5", RedirectType.replace)
}
