import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('composing two partial pipelines should apply all through streams correctly', (done) => {
    // Each through adds a fixed value
    const addN = (n: number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + n)
      })
    }

    // Create a partial pipeline with 2 throughs: adds 10, then adds 20
    const inner = pull(addN(10), addN(20))
    // inner has .length === 1 (it's the returned partial sink function)

    // Now create another partial pipeline where the first arg is `inner` (length 1)
    // This enters the partial sink branch with length=2, args=[inner, addN(1)]
    // Mutation: args=[inner, addN(1), undefined]
    // When invoked with a real source (length 2):
    //   switch(2): pull(source, ref[0], ref[1]) = pull(source, inner, addN(1))
    //   inner.length === 1, so pull(source, inner, addN(1)) enters partial sink branch
    //   length=3, mutation: args=[source, inner, addN(1), undefined]
    //   Returns a new partial sink with length=3
    //   When invoked... wait, source has length 2, not 1.
    //
    // Actually let me reconsider: pull(source, inner, addN(1))
    //   a=source (length 2) -> NOT partial sink branch -> normal path
    //   i=1: s=inner (function, length 1) -> read = inner(source)
    //     inner(source): ref=[addN(10), addN(20)], switch(2): pull(source, addN(10), addN(20))
    //     a=source (length 2) -> normal path -> applies addN(10) then addN(20)
    //     returns addN(20)(addN(10)(source))
    //   i=2: s=addN(1) -> read = addN(1)(addN(20)(addN(10)(source)))
    //   returns read
    //
    // Hmm, that's the same in both cases.
    //
    // Let me try the scenario I identified: pull(inner, addN(1))
    // inner.length === 1, so a=inner, a.length=1 -> partial sink branch
    // length=2, original: args=[inner, addN(1)], mutated: args=[inner, addN(1), undefined]
    // Returns partial_outer
    //
    // partial_outer(source) where source.length=2:
    //   switch(2): pull(source, ref[0], ref[1]) = pull(source, inner, addN(1))
    //   a=source (length 2) -> normal path
    //   i=1: s=inner -> read=inner(source) = addN(20)(addN(10)(source))
    //   i=2: s=addN(1) -> read=addN(1)(addN(20)(addN(10)(source)))
    //   SAME in both cases
    //
    // partial_outer(through) where through.length=1:
    //   switch(2): pull(through, ref[0], ref[1]) = pull(through, inner, addN(1))
    //   a=through (length 1) -> partial sink branch!
    //   length=3, original: args=[through, inner, addN(1)]
    //   length=3, mutated: args=[through, inner, addN(1), undefined]
    //   Returns partial_inner with length=3
    //
    //   partial_inner(source) where source.length=2:
    //     switch(3): pull(source, ref[0], ref[1], ref[2])
    //     Original: ref=[through, inner, addN(1)], pull(source, through, inner, addN(1))
    //     Mutated: ref=[through, inner, addN(1), undefined], pull(source, through, inner, undefined)
    //     !!! addN(1) is REPLACED by undefined in the mutated case !!!
    //
    // This IS detectable! The mutated case loses addN(1).

    const through1 = addN(100) // length 1 through

    // Build: pull(inner, addN(1)) -> partial_outer
    const partial_outer = pull(inner, addN(1))

    // Invoke with through1 (length 1) -> partial_inner
    const partial_inner = partial_outer(through1)

    // Invoke partial_inner with a real source
    let idx = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= 1) return cb(true)
      cb(null, idx++)
    }

    // Expected: source emits 0
    // through1 adds 100 -> 100
    // inner applies addN(10) then addN(20) -> 130
    // addN(1) adds 1 -> 131
    // Total: 0 + 100 + 10 + 20 + 1 = 131
    //
    // Mutated: addN(1) is replaced by undefined (skipped)
    // Total: 0 + 100 + 10 + 20 = 130

    const piped = partial_inner(source)

    piped(null, (end: any, data: any) => {
      if (end === true) {
        done(new Error('stream ended without producing a value'))
        return
      }
      if (end) {
        done(end instanceof Error ? end : new Error('stream error'))
        return
      }
      expect(data).toBe(131)
      done()
    })
  })
})