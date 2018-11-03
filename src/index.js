import remember from 'callbag-remember'
import subject from 'callbag-subject'
import { useRef } from 'react'

export default function useValueCallbag(value) {
  const value$Ref = useRef(null)

  if (value$Ref.current === null) {
    const value$ = subject()
    value$Ref.current = [remember(value$), value$]
  }

  value$Ref.current[1](1, value)
  return value$Ref.current[0]
}
