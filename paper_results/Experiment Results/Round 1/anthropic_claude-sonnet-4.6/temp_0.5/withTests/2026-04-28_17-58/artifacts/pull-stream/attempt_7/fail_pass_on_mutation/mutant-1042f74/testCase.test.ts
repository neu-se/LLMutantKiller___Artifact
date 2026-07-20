import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('should only read each item once from a synchronous source', (done) => {
    const items = [1, 2, 3, 4, 5]
    let idx = 0
    let readCount = 0

    const source = (abort: any, cb: Function) => {
      readCount++
      if (abort) return cb(abort)
      if (idx >= items.length) return cb(true)
      cb(null, items[idx++])
    }

    const received: number[] = []
    const sink = drain((data: number) => {
      received.push(data)
    }, (err: any) => {
      expect(err).toBeNull()
      expect(received).toEqual([1, 2, 3, 4, 5])
      // readCount should be exactly items.length + 1 (one extra for the end signal)
      expect(readCount).toBe(items.length + 1)
      done()
    })

    sink(source)
  })
})