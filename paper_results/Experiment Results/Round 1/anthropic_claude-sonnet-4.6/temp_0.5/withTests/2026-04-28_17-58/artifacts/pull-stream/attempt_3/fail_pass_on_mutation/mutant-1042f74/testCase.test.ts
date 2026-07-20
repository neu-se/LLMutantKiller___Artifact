import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('should process items from an async source correctly', (done) => {
    const items = [1, 2, 3]
    let idx = 0
    // Async source - callback called via setImmediate
    const source = (abort: any, cb: Function) => {
      if (abort) return setImmediate(() => cb(abort))
      if (idx >= items.length) return setImmediate(() => cb(true))
      const val = items[idx++]
      setImmediate(() => cb(null, val))
    }
    const received: number[] = []
    const sink = drain((data: number) => { received.push(data) }, (err: any) => {
      expect(err).toBeNull()
      expect(received).toEqual([1, 2, 3])
      done()
    })
    sink(source)
  })
})