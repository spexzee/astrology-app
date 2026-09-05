import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches IntersectionObserver to add `.visible`
 * class to elements with `.reveal` class inside the referenced container.
 */
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('.reveal')
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    items.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}
