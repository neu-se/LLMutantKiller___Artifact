import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with duplex stream object', () => {
  it('should correctly pipe through a duplex stream object with sink and source properties', (done) => {
    // Create a simple duplex stream object (has both .source and .sink)
    // This is the pattern that triggers the `else if (s && typeof s === 'object')` branch
    const results: number[] = []

    // Create a through-stream as an object with source and sink
    function makeDuplex(transform: (x: number) => number) {
      let _read: Function
      const duplex = {
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
      return duplex
    }

    const doubler = makeDuplex((x: number) => x * 2)

    // Source: values 1, 2, 3
    let i = 0
    const values = [1, 2, 3]
    function source(abort: any, cb: Function) {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Sink: collect results
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

    // Use pull with a duplex object - this exercises the `else if (s && typeof s === 'object')` branch
    pull(source, doubler, sink)
  })
})