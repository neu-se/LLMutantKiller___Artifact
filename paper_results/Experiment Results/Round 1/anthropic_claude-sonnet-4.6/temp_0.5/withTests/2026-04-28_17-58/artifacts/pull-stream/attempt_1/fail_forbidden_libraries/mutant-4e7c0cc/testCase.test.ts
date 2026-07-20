import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink with 3 arguments', () => {
  it('should correctly pipe through 3 transforms when used as a partial sink', (done) => {
    const add1 = (read: Function) => (abort: any, cb: Function) => read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data + 1))
    const mul2 = (read: Function) => (abort: any, cb: Function) => read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data * 2))
    const sub3 = (read: Function) => (abort: any, cb: Function) => read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data - 3))

    const partialSink = pull(add1, mul2, sub3)

    expect(typeof partialSink).toBe('function')
    expect(partialSink.length).toBe(1)

    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      cb(null, 5)
    }

    const combined = partialSink(source)

    combined(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      // (5 + 1) * 2 - 3 = 9
      expect(data).toBe(9)
      done()
    })
  })
})