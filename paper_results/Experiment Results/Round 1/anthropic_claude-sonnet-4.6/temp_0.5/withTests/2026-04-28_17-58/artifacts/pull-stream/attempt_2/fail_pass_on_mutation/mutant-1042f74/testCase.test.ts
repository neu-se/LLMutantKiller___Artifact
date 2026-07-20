import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('should call done with null after draining a synchronous source', (done) => {
    const items = [1, 2, 3]
    let idx = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= items.length) return cb(true)
      cb(null, items[idx++])
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