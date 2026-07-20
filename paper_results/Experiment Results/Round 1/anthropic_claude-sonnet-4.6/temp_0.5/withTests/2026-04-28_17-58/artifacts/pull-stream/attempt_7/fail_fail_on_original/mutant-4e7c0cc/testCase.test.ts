import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 4 args works with duplex object streams', (done) => {
    // Use duplex objects (with source and sink) to test case 4
    function makeDuplex(transform: (x: number) => number) {
      let _read: Function
      return {
        sink: (read: Function) => { _read = read },
        source: (abort: any, cb: Function) => 
          _read(abort, (end: any, data: any) => end ? cb(end) : cb(null, transform(data)))
      }
    }

    const d1 = makeDuplex((x) => x + 1)
    const d2 = makeDuplex((x) => x * 2)
    const d3 = makeDuplex((x) => x + 10)
    const d4 = makeDuplex((x) => x * 3)

    // partial sink with 4 duplex objects
    const partialSink = pull(d1, d2, d3, d4)

    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort || called) return cb(true)
      called = true
      cb(null, 1)
    }

    const piped = partialSink(source)
    piped(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      // ((1+1)*2+10)*3 = 42
      expect(data).toBe(42)
      done()
    })
  })
})