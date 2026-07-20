import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('detects mutation by checking cbed initialization affects loop exit for async next() calls', (done) => {
    // Create a source where after op returns false, the abort read is async
    // This exercises the path where next() is called with !loop
    const items = [1, 2, 3]
    let idx = 0
    let abortReceived = false

    const source = (abort: any, cb: Function) => {
      if (abort) {
        abortReceived = true
        // async abort acknowledgment
        setImmediate(() => cb(abort))
        return
      }
      if (idx >= items.length) return cb(true)
      cb(null, items[idx++])
    }

    const received: number[] = []
    // op returns false on item 2, triggering abort
    const sink = drain((data: number) => {
      received.push(data)
      if (data === 2) return false
    }, (err: any) => {
      expect(abortReceived).toBe(true)
      expect(received).toEqual([1, 2])
      done()
    })

    sink(source)
  })
})