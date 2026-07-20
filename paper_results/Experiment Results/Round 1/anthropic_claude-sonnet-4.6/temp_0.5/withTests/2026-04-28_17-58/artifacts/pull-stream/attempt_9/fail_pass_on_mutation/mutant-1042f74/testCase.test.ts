import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('processes items correctly when source becomes async after first sync read', (done) => {
    let idx = 0
    const items = [10, 20, 30]
    let firstCall = true

    // First read is sync, subsequent reads are async
    const source = (abort: any, cb: Function) => {
      if (abort) return setImmediate(() => cb(abort))
      if (idx >= items.length) {
        if (firstCall) {
          firstCall = false
          cb(true)
        } else {
          setImmediate(() => cb(true))
        }
        return
      }
      const val = items[idx++]
      if (firstCall) {
        firstCall = false
        cb(null, val)
      } else {
        setImmediate(() => cb(null, val))
      }
    }

    const received: number[] = []
    const sink = drain((data: number) => {
      received.push(data)
    }, (err: any) => {
      expect(err).toBeNull()
      expect(received).toEqual([10, 20, 30])
      done()
    })

    sink(source)
  })
})