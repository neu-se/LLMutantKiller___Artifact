import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with partial application of 2 through-streams', () => {
  it('should produce correct transformed values when partial pipeline with 2 throughs is applied to a source', (done) => {
    // Source that emits a single value then ends
    let called = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called > 0) return cb(true)
      called++
      cb(null, 5)
    }

    // Two through-streams that each transform the value
    const times3 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 3)
      })
    }

    const plus1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // Partial application with exactly 2 through-streams
    // This hits case 2 in the switch
    const pipeline = pull(times3, plus1)

    // Apply source to pipeline
    const read = pipeline(source)

    // Read the single value
    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      // Original: pull(read, times3, plus1) => 5*3+1 = 16
      // Mutant falls through to case 3: pull(read, times3, plus1, undefined)
      // undefined is skipped in the loop, so result is still 16
      expect(data).toBe(16)

      // Read again to get end-of-stream
      read(null, (end2: any, data2: any) => {
        expect(end2).toBeTruthy()
        done()
      })
    })
  })
})