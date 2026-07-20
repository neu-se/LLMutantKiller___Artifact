import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial sink with 3 arguments', () => {
  it('correctly chains 3 through streams when used as partial sink', (done) => {
    // Create 3 simple through functions manually (no pull.map)
    const addOne = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data + 1))

    const double = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data * 2))

    const subOne = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data - 1))

    // This creates a partial sink with exactly 3 arguments (length === 3, case 3 in switch)
    const partialSink = pull(addOne, double, subOne)

    expect(typeof partialSink).toBe('function')
    expect(partialSink.length).toBe(1)

    // Source that emits value 5 once then ends
    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 5)
    }

    const piped = partialSink(source)

    piped(null, (end: any, data: any) => {
      // (5 + 1) * 2 - 1 = 11
      expect(end).toBeFalsy()
      expect(data).toBe(11)
      done()
    })
  })
})