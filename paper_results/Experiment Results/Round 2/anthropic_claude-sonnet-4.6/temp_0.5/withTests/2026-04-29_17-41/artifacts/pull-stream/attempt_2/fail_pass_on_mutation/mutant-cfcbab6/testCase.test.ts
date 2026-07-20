import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull pipeline processes all transforms', () => {
  it('should apply all transforms when pipeline has source, two throughs, and a sink', (done) => {
    let idx = 0
    const vals = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort || idx >= vals.length) return cb(true)
      cb(null, vals[idx++])
    }

    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addTen = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data + 10)
      })
    }

    const collected: number[] = []
    const sink = (read: Function) => {
      const drain = (end: any, data: number) => {
        if (end) {
          expect(collected).toEqual([12, 14, 16])
          done()
          return
        }
        collected.push(data)
        read(null, drain)
      }
      read(null, drain)
    }

    pull(src, double, addTen, sink)
  })
})