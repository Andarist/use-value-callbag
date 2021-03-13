import behaviorSubject from 'callbag-behavior-subject'
import { useRef, useEffect } from 'react'

export default function useValueCallbag(value) {
  const value$Ref = useRef()

  if (!value$Ref.current) {
    value$Ref.current = behaviorSubject(value)
  }

  useEffect(() => {
    value$Ref.current(1, value)
  }, [value])

  useEffect(() => () => value$Ref.current(2), [])

  return value$Ref.current
}
