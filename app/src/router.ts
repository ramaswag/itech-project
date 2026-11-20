import { useEffect, useState } from 'react'

export function go(path: string) {
  location.hash = `#/${path}`
}

export function useRoute() {
  const read = () => location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const [parts, setParts] = useState<string[]>(read)
  useEffect(() => {
    const on = () => {
      setParts(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return parts
}
