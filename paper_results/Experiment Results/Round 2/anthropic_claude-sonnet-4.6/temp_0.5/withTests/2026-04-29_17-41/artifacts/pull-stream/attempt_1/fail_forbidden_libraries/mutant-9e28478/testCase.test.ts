import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial application with 2 through streams', () => {
  it('should correctly apply 2 through streams when using partial sink pattern', (done) => {
    // Create a partial pipeline with exactly 2 through functions (case 2 in the switch)
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end)
        else cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end)
        else cb(null, data + 1)
      })
    }

    // This creates a partial sink with 2 through functions (length === 2)
    // In the switch statement, this hits case 2
    const pipeline = pull(double, addOne)

    // pipeline should be a function that accepts a read source
    expect(typeof pipeline).toBe('function')
    expect(pipeline.length).toBe(1)

    // Now provide a source to complete the pipeline
    const source = (abort: any, cb: Function) => {
      let i = 0
      const values = [1, 2, 3]
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Create a proper source
    let idx = 0
    const values = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }

    const read = pipeline(src)

    // Collect results
    const results: number[] = []
    const collect = (abort: any, cb: Function) => {
      read(null, function next(end: any, data: any) {
        if (end === true) {
          // Expected: [1*2+1, 2*2+1, 3*2+1] = [3, 5, 7]
          expect(results).toEqual([3, 5, 7])
          done()
          return
        }
        if (end) {
          done(end)
          return
        }
        results.push(data)
        read(null, next)
      })
    }

    collect(null, () => {})
  })
})