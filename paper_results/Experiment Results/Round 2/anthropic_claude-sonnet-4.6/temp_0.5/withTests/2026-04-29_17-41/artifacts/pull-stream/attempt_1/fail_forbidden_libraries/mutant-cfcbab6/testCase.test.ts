import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with multiple pipeline stages', () => {
  it('should correctly apply all transforms in a pipeline with more than two stages', (done) => {
    const results: number[] = []

    // Create a simple source
    const source = (abort: any, cb: Function) => {
      const values = [1, 2, 3]
      let i = 0
      const read = (abort: any, cb: Function) => {
        if (abort || i >= values.length) cb(true)
        else cb(null, values[i++])
      }
      read(abort, cb)
    }

    // Create a simple source that returns values
    let idx = 0
    const vals = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort || idx >= vals.length) return cb(true)
      cb(null, vals[idx++])
    }

    // Transform 1: multiply by 2
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // Transform 2: add 10
    const addTen = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data + 10)
      })
    }

    // Sink: collect results
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

    // This pipeline has source + 2 throughs + sink = 4 arguments
    // With the mutation, the inner loop goes i <= length causing i to overshoot,
    // so the outer loop only processes the first through (double) but skips addTen
    pull(src, double, addTen, sink)
  })
})