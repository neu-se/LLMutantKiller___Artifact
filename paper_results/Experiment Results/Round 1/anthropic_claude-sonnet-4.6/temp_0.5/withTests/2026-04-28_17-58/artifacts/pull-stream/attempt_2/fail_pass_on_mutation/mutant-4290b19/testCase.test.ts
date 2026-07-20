import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink with 5 through streams triggers default switch case', () => {
  it('should correctly process values through 5 chained through streams without undefined argument error', (done) => {
    const makeAdd = (n: number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + n)
      })
    }

    // 5 arguments causes pull to enter the partial sink branch (first arg has .length === 1)
    // and later when invoked hits the default switch case: ref.unshift(read); pull.apply(null, ref)
    // With mutation, ref has an extra undefined at index 5, causing pull to receive undefined as a stream
    const pipeline = pull(
      makeAdd(1),
      makeAdd(2),
      makeAdd(3),
      makeAdd(4),
      makeAdd(5)
    )

    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 0)
    }

    let result: number | null = null
    let error: any = null

    try {
      const piped = pipeline(source)
      piped(null, (end: any, data: any) => {
        if (end && end !== true) {
          error = end
          expect(error).toBeNull()
          done()
          return
        }
        if (!end) {
          result = data
        }
        // 0 + 1 + 2 + 3 + 4 + 5 = 15
        expect(result).toBe(15)
        done()
      })
    } catch (e) {
      // Mutated code throws when undefined is used as a stream
      expect(e).toBeNull() // force failure on mutated code
      done()
    }
  })
})