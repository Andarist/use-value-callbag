import React, { useState, useEffect, useLayoutEffect } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import pipe from 'callbag-pipe'
import subscribe from 'callbag-subscribe'

import useValueCallbag from './index'

test('the hook works.', () => {
  let res = []

  const { result } = renderHook(() => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const val$ = useValueCallbag(x)
    useEffect(
      () =>
        pipe(
          val$,
          subscribe(v => res.push(v)),
        ),
      [],
    )

    return {
      nextX: () => setX(x + 1),
      nextY: () => setY(y + 1),
    }
  })

  expect(res).toStrictEqual([0])

  act(() => result.current.nextX())
  expect(res).toStrictEqual([0, 1])

  act(() => result.current.nextY())
  expect(res).toStrictEqual([0, 1])

  act(() => result.current.nextX())
  expect(res).toStrictEqual([0, 1, 2])
})

test('no redundant emissions when used with layout effects.', () => {
  let res = []

  const { result } = renderHook(() => {
    const [x, setX] = useState(0)
    const val$ = useValueCallbag(x)
    useLayoutEffect(
      () =>
        pipe(
          val$,
          subscribe(v => res.push(v)),
        ),
      [],
    )

    return () => setX(x + 1)
  })

  expect(res).toStrictEqual([0])

  act(() => result.current())
  expect(res).toStrictEqual([0, 1])
})
