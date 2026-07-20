import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink with multiple throughs', () => {
  it('should correctly pipe through a partial sink created with multiple through streams', (done) => {
    // Create a partial sink (pull called with a function of arity 1 as first arg)
    // This triggers the branch where args are collected
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // This creates a partial sink - pull is called with functions of arity 1
    // The first arg has length === 1, so it enters the partial sink branch
    // args should contain exactly [double, addOne] (2 elements)
    // With mutation, args will contain [double, addOne, undefined] (3 elements)
    const pipeline = pull(double, addOne)

    const results: number[] = []
    
    // Create a simple source
    const values = [1, 2, 3]
    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Apply the pipeline to the source
    const piped = pipeline(source)

    // Drain the stream
    const drain = (read: Function) => {
      read(null, function next(end: any, data: any) {
        if (end === true) {
          expect(results).toEqual([3, 5, 7])
          done()
          return
        }
        if (end) return done(end)
        results.push(data)
        read(null, next)
      })
    }

    drain(piped)
  })
})