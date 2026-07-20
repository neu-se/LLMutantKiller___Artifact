import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 4 arguments correctly chains all transforms', (done) => {
    const addOne = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data + 1))
    const double = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data * 2))
    const subOne = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data - 1))
    const triple = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data * 3))

    // partial sink with exactly 4 arguments - hits case 4 in switch
    const partialSink = pull(addOne, double, subOne, triple)

    expect(typeof partialSink).toBe('function')
    expect(partialSink.length).toBe(1)

    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 5)
    }

    const piped = partialSink(source)
    piped(null, (end: any, data: any) => {
      // (5+1)*2-1)*3 = 33
      expect(end).toBeFalsy()
      expect(data).toBe(33)
      done()
    })
  })
})