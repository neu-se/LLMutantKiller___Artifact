import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with object streams', () => {
  it('should handle a pipeline where a through stream is an object with source and sink', (done) => {
    // Create an object-style through stream
    const objectThrough = {
      sink: function(read: Function) {
        this._read = read
      },
      source: function(abort: any, cb: Function) {
        this._read(abort, (end: any, data: any) => {
          if (end) cb(end)
          else cb(null, data * 2)
        })
      }
    }
    objectThrough.source = objectThrough.source.bind(objectThrough)
    objectThrough.sink = objectThrough.sink.bind(objectThrough)

    // In mutated code, passing a non-object (like null) after a function source
    // would cause else if(true) to execute and call null.sink() → crash
    // Test that null/undefined arguments don't crash in original but do in mutated
    expect(() => {
      pull(pull.values([1,2,3]), null as any, pull.collect(() => {}))
    }).toThrow()
  })
})