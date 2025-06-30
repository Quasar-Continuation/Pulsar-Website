"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

interface UseInViewAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  margin?: string
}

export function useInViewAnimation(options: UseInViewAnimationOptions = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options.triggerOnce ?? true,
    margin: options.margin ?? "-100px",
    amount: options.threshold ?? 0.1,
  })

  return { ref, isInView }
}
