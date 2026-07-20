import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 4 through functions should correctly pipe data', (done) => {
    const makeThrough = (fn: (x: number) => number) => (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, fn(data)))

    // Exactly 4 through functions - hits case 4 in switch
    const partialSink = pull(
      makeThrough((x) => x + 1),
      makeThrough((x) => x * 2),
      makeThrough((x) => x + 10),
      makeThrough((x) => x * 3)
    )

    // source read function has length 2 (abort, cb) so it won't be treated as a through
    const source = function(abort: any, cb: Function) {
      cb(null, 1)
    }

    const piped = partialSink(source)
    // If case 4 falls through to default, ref.unshift(source) makes ref have 5 elements
    // pull.apply(null, [source, t1, t2, t3, t4]) - source.length is 2, not 1
    // so pull treats source as a read function and chains correctly
    // result should be ((1+1)*2+10)*3 = 42
    piped(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      expect(data).toBe(42)
      done()
    })
  })
})