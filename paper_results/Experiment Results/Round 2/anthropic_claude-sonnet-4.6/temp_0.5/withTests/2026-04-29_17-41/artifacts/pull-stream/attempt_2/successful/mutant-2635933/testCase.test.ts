import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with duplex stream object', () => {
  it('should correctly pipe through a duplex stream object with source and sink properties', (done) => {
    const results: number[] = []

    let _read: Function

    const duplex = {
      sink: function(read: Function) {
        _read = read
      },
      source: function(abort: any, cb: Function) {
        _read(abort, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    const values = [1, 2, 3]
    let i = 0
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    const read = pull(source, duplex)

    function drain() {
      read(null, function(end: any, data: any) {
        if (end) {
          expect(results).toEqual([2, 4, 6])
          done()
          return
        }
        results.push(data)
        drain()
      })
    }
    drain()
  })
})