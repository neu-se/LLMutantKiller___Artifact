import { describe, it, expect } from '@jest/globals'
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should collect all data from a synchronous source', (done) => {
    const values = [1, 2, 3, 4, 5]
    let i = 0
    
    // Synchronous source
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    const collected: number[] = []
    
    const sink = drain(
      (data: number) => { collected.push(data) },
      (err: any) => {
        expect(err).toBeNull()
        expect(collected).toEqual([1, 2, 3, 4, 5])
        done()
      }
    )
    
    sink(source)
  })
})