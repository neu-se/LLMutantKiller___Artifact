import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js')

describe('pull with duplex stream object', () => {
  it('should correctly pipe data through a duplex stream object with sink and source', (done) => {
    // Create a duplex stream object (has both .source and .sink properties)
    // This exercises the `else if (s && typeof s === 'object')` branch in pull.js
    function makeDuplex(transform: (x: number) => number) {
      let _read: Function
      return {
        sink: function(read: Function) {
          _read = read
        },
        source: function(abort: any, cb: Function) {
          _read(abort, function(end: any, data: any) {
            if (end) return cb(end)
            cb(null, transform(data))
          })
        }
      }
    }

    const doubler = makeDuplex((x: number) => x * 2)

    // Simple source: emits 1, 2, 3
    let i = 0
    const values = [1, 2, 3]
    function source(abort: any, cb: Function) {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    const results: number[] = []

    // Simple sink: collects results
    function sink(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end === true) {
            expect(results).toEqual([2, 4, 6])
            done()
            return
          }
          if (end) {
            done(end)
            return
          }
          results.push(data)
          next()
        })
      }
      next()
    }

    // Pull with a duplex object - exercises the `else if (s && typeof s === 'object')` branch
    pull(source, doubler, sink)
  })
})