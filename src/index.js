import behaviorSubject from 'callbag-behavior-subject'
import { useRef } from 'react'

export default function useValueCallbag(value) {
  const value$Ref = useRef(null)

  if (value$Ref.current === null) {
    value$Ref.current = behaviorSubject(value)
  } else {
    value$Ref.current(1, value)
  }

  return value$Ref.current
}
