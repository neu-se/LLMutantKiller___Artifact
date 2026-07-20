import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull pipeline', () => {
  it('should correctly process pipeline with exactly one through and one sink returning undefined', () => {
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

    // sink as object with sink+source (duplex)
    let sinkRead: Function
    const duplex = {
      sink: (read: Function) => { sinkRead = read },
      source: (abort: any, cb: Function) => { cb(true) }
    }

    const result = pull(src, double, duplex)
    // After processing a full pipeline ending with a duplex sink,
    // result should be duplex.source
    expect(result).toBe(duplex.source)
  })
})