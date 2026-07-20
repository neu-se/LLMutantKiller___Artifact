import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with 2 through-streams composed', () => {
  it('should correctly apply a pipeline of exactly 2 through-streams', (done) => {
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // Create a composed pipeline with exactly 2 through-streams
    // This triggers the case where length === 2 in the curried pull
    const pipeline = pull(double, addOne)

    // pipeline should be a function that accepts a read
    const source = (abort: any, cb: Function) => {
      cb(null, 5)
    }

    const read = pipeline(source)

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      expect(data).toBe(11) // 5 * 2 + 1 = 11
      done()
    })
  })
})