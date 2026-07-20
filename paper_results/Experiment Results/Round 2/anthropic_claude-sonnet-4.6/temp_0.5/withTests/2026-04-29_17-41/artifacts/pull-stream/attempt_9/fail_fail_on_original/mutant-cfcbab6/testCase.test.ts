import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('applies through transformation exactly once to produce correct output', (done) => {
    const source = (abort: any, cb: Function) => {
      let done2 = false
      if (abort || done2) return cb(true)
      done2 = true
      cb(null, 5)
    }

    const doubler = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const results: number[] = []
    const sink = (read: Function) => {
      const loop = (end: any, data: number) => {
        if (end) {
          expect(results).toEqual([10])
          done()
          return
        }
        results.push(data)
        read(null, loop)
      }
      read(null, loop)
    }

    pull(source, doubler, sink)
  })
})