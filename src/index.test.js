import React, { useState, useEffect } from 'react'
import { create, act } from 'react-test-renderer'
import { pipe, subscribe } from 'callbag-common'

import useValueCallbag from './index'

test('the hook works.', () => {
  let res = []

  function Comp() {
    const [val, set] = useState(0)
    const [val2, set2] = useState(0)
    const val$ = useValueCallbag(val)

    useEffect(() => {
      pipe(
        val$,
        subscribe({
          next: v => res.push(v),
          complete: () => (res = 'DONE'),
        }),
      )
    }, [])

    return (
      <>
        <button onClick={() => set(val + 1)} />
        <span onClick={() => set2(val2 + 1)} />
      </>
    )
  }

  let component

  act(() => {
    component = create(<Comp />)
  })
  expect(res).toStrictEqual([0])

  const button = component.root.findByType('button')
  const span = component.root.findByType('span')

  act(() => {
    button.props.onClick()
  })
  expect(res).toStrictEqual([0, 1])

  act(() => {
    span.props.onClick()
  })
  expect(res).toStrictEqual([0, 1])

  act(() => {
    button.props.onClick()
  })
  expect(res).toStrictEqual([0, 1, 2])

  act(() => {
    component.unmount()
  })
  expect(res).toBe('DONE')
})
