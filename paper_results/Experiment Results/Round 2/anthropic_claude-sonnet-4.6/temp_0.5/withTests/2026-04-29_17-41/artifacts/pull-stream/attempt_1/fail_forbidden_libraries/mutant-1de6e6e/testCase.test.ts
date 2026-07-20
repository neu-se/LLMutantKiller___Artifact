import { describe, it, expect } from '@jest/globals'
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js'

describe('reduce without initial value on empty stream', () => {
  it('should call callback with null error when source ends immediately with an error', (done) => {
    const err = new Error('source error')
    
    // Source that immediately ends with an error
    const errorSource = (abort: any, cb: Function) => {
      cb(err)
    }
    
    const sink = reduce(
      (acc: any, data: any) => acc + data,
      (callbackErr: any, result: any) => {
        expect(callbackErr).toBe(err)
        done()
      }
    )
    
    sink(errorSource)
  })
})