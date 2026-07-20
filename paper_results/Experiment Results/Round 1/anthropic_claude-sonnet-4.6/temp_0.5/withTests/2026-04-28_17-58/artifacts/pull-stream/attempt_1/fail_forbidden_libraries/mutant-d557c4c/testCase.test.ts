import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with through function', () => {
  it('should correctly pipe through a plain function without throwing', (done) => {
    const results: number[] = []

    // Create a simple source
    const source = (function() {
      const values = [1, 2, 3]
      let i = 0
      return function(abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    })()

    // Create a plain through function (not an object)
    const double = function(read: Function) {
      return function(abort: any, cb: Function) {
        read(abort, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // Create a sink
    const sink = function(read: Function) {
      read(null, function next(end: any, data: any) {
        if (end) {
          expect(results).toEqual([2, 4, 6])
          done()
          return
        }
        results.push(data)
        read(null, next)
      })
    }

    // This should work fine with original code but throw with mutated code
    // because mutated code tries to call double.sink(read) which doesn't exist
    expect(() => {
      pull(source, double, sink)
    }).not.toThrow()
  })
})