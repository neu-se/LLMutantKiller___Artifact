import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 3 throughs called with length-1 read creates correct nested partial sink', (done) => {
    const addOne = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data + 1))

    // Create partial sink with exactly 3 through functions
    const partialSink = pull(addOne, addOne, addOne)

    // A read function with length===1 triggers the partial sink creation path
    // In original: pull(read1arg, t1, t2, t3, undefined) -> new partial sink with args=[t1,t2,t3,undefined], length=4
    // In mutated:  pull(read1arg, t1, t2, t3) -> new partial sink with args=[t1,t2,t3], length=3
    const read1arg = function(_cb: Function) {} // length === 1

    const nestedPartialSink = partialSink(read1arg as any)

    // Now call the nested partial sink with an actual source
    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort || called) return cb(true)
      called = true
      cb(null, 0)
    }

    const piped = (nestedPartialSink as any)(source)
    piped(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      // 0 + 1 + 1 + 1 = 3 (three addOne throughs applied)
      expect(data).toBe(3)
      done()
    })
  })
})