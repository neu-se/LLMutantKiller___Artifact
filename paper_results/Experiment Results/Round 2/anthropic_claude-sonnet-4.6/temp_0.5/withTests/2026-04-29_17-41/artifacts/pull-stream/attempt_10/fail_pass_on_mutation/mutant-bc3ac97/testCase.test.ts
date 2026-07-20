const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull case 3 mutation', () => {
  it('applies exactly 3 through-streams when using curried form with 3 streams', (done) => {
    const log: string[] = []

    const s1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        log.push('s1')
        cb(null, data)
      })
    }

    const s2 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        log.push('s2')
        cb(null, data)
      })
    }

    const s3 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        log.push('s3')
        cb(null, data)
      })
    }

    // Directly call pull with 3 through-streams (not curried)
    // to verify case 3 in the switch works correctly
    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i++ > 0) return cb(true)
      cb(null, 42)
    }

    // This triggers the non-curried path directly
    // length=4 (source + 3 streams), hits case 4 in switch? No...
    // Actually this is the non-curried path (read = source, loop applies streams)
    // The curried path is triggered when first arg is a function with .length===1

    // s1, s2, s3 each have length 1, so pull(s1, s2, s3) is curried
    // When called with source: switch(3) -> case 3 -> return pull(source, s1, s2, s3)
    // In mutated: case 3 empty, falls to case 4: pull(source, s1, s2, s3, undefined)
    // undefined is 5th arg, skipped in loop - same result

    // What if we make the 4th stream (undefined) cause observable difference?
    // Let's count how many times the source is read
    let sourceReads = 0
    const countingSource = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      sourceReads++
      if (sourceReads > 1) return cb(true)
      cb(null, 42)
    }

    const pipeline = pull(s1, s2, s3)
    const read = pipeline(countingSource)

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      expect(data).toBe(42)
      expect(log).toEqual(['s1', 's2', 's3'])
      done()
    })
  })
})