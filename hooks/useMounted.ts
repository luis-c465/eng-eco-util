import { useEffect, useState } from "react"

/**
 * Hook that returns true if the component is mounted.
 */
export default function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
