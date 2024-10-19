export type PageProps = {
  children: React.ReactNode
  title: string
  description?: string
}

export default function Page({children, title, description}: PageProps) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {title}
          <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  )
}
