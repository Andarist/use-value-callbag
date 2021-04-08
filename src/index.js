import behaviorSubject from 'callbag-behavior-subject'
import { useRef, useEffect } from 'react'

export default function useValueCallbag(value) {
  const value$Ref = useRef()
  const lastVal = useRef(value)

  if (!value$Ref.current) {
    value$Ref.current = behaviorSubject(value)
    lastVal.current = value
  }

  const subject = value$Ref.current

  useEffect(() => {
    if (lastVal.current !== value) {
      subject(1, value)
      lastVal.current = value
    }
  })

  return subject
}
