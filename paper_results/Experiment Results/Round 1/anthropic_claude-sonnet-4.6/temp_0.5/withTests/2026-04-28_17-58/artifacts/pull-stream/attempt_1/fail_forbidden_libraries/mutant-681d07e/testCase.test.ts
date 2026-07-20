import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull stream partial sink double-call protection', () => {
  it('should throw TypeError when a partial sink is called twice', () => {
    const mapThrough = (fn: (x: number) => number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, fn(data))
      })
    }

    // Create a partial sink (first arg is a through, which has length === 1)
    const partialSink = pull(
      mapThrough((x: number) => x * 2)
    )

    // First call should work fine
    const source = (abort: any, cb: Function) => {
      cb(true) // immediately end
    }

    // First call should succeed
    partialSink(source)

    // Second call should throw TypeError in original code
    // In mutated code (if (false)), the check is disabled and it won't throw
    expect(() => {
      partialSink(source)
    }).toThrow(TypeError)
  })
})