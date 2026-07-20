import { describe, it, expect } from '@jest/globals'
import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js'

describe('find - error handling when item not found', () => {
  it('should pass the actual error to callback when stream ends with an error and no item is found', (done) => {
    const expectedError = new Error('stream error')
    
    // Create a source that emits an error
    const errorSource = (abort: any, cb: Function) => {
      cb(expectedError)
    }
    
    const sink = find(
      (d: any) => d === 'never-matches',
      (err: any, data: any) => {
        expect(err).toBe(expectedError)
        expect(data).toBeNull()
        done()
      }
    )
    
    sink(errorSource)
  })
})