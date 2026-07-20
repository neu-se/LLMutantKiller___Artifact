import { describe, it, expect } from '@jest/globals'
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js'

describe('reduce without initial value - error handling', () => {
  it('should pass error to callback when source errors immediately with no initial value', (done) => {
    const testError = new Error('test error')
    
    // Create a source that immediately errors
    const errorSource = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(testError)
    }
    
    const sink = reduce(
      (acc: number, data: number) => acc + data,
      (err: any, result: any) => {
        expect(err).toBe(testError)
        expect(result).toBeUndefined()
        done()
      }
    )
    
    sink(errorSource)
  })
})