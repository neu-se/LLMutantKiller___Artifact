import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should not call done multiple times with a synchronous source that has exactly one item', (done) => {
    let doneCallCount = 0
    let idx = 0
    const items = [42]

    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= items.length) return cb(true)
      cb(null, items[idx++])
    }

    const sink = drain(null, (err: any) => {
      doneCallCount++
      // Use setTimeout to check after any potential extra calls
      setTimeout(() => {
        expect(doneCallCount).toBe(1)
        expect(err).toBeNull()
        done()
      }, 50)
    })

    sink(source)
  })
})