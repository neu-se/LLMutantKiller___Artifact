import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with source object as first argument', () => {
  it('should extract source from an object with a source function when passed as first argument', (done) => {
    // Create a duplex-like object that has both sink and source
    const values = [1, 2, 3]
    let i = 0

    const sourceObj = {
      source: function(abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      },
      sink: function(read: Function) {
        // consume the read
      }
    }

    // When pull receives an object with a source function as first arg,
    // it should use sourceObj.source as the read function
    const result: number[] = []
    
    const read = pull(sourceObj)
    
    // The result should be a read function (the source)
    // In original: read = sourceObj.source, so calling read works
    // In mutated: read = sourceObj (the object), so calling read fails
    
    function drain(end: any, data: any) {
      if (end === true) {
        expect(result).toEqual([1, 2, 3])
        done()
        return
      }
      if (end) {
        done(end)
        return
      }
      result.push(data)
      read(null, drain)
    }
    
    read(null, drain)
  })
})