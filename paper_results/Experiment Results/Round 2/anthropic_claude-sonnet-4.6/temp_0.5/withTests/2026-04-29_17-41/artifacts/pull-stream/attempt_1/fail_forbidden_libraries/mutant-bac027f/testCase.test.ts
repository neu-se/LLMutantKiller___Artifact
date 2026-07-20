import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with duplex stream object as first argument', () => {
  it('should use the source property of a duplex stream object passed as first argument', (done) => {
    // Create a simple source that emits values 1, 2, 3
    const values = [1, 2, 3]
    let i = 0
    const sourceRead = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Create a duplex-style object with a source property
    const duplexObj = {
      sink: (read: Function) => {
        // consume the read function (not used in this test)
      },
      source: sourceRead
    }

    const collected: number[] = []

    // Pass the duplex object as the first argument to pull
    // In the original code, read = duplexObj.source is set when duplexObj has a source function
    // In the mutated code, this branch is skipped, so read remains duplexObj (the object itself)
    // which would not work as a read function
    const result = pull(duplexObj, (read: Function) => {
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (!end) collected.push(data)
          cb(end, data)
        })
      }
    })

    // result should be a readable function
    expect(typeof result).toBe('function')

    // Drain the stream
    const drain = (abort: any, cb: Function) => {
      result(abort, function next(end: any, data: any) {
        if (end) return cb(end)
        drain(null, next)
      })
    }

    result(null, function next(end: any, data: any) {
      if (end === true) {
        // Stream ended normally
        expect(collected).toEqual([1, 2, 3])
        done()
        return
      }
      if (end) {
        done(end)
        return
      }
      result(null, next)
    })
  })
})