import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double-call guard', () => {
  it('throws TypeError on second invocation of partial sink', () => {
    // through with explicit length of 1
    function through(read: Function) {
      return read
    }

    const partialSink = pull(through)

    const source = function(_abort: any, cb: Function) {
      cb(true)
    }

    // First call succeeds - this sets args to null internally
    partialSink(source)

    // Second call must throw TypeError in original code
    // Mutated code has `if (false)` so it never throws - test fails on mutant
    let threw = false
    let errorType = ''
    try {
      partialSink(source)
    } catch (e) {
      threw = true
      errorType = (e as Error).constructor.name
    }

    expect(threw).toBe(true)
    expect(errorType).toBe('TypeError')
  })
})