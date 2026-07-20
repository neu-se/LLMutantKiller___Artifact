import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('writable partial pipeline should produce correct output when invoked via partial sink chain', (done) => {
    const add1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // pull(add1, add1, add1, add1) - 4 args
    // Original: args=[add1,add1,add1,add1], length=4
    // Mutated: args=[add1,add1,add1,add1,undefined], length=4
    // Invoke with add1 (length 1):
    //   switch(4): pull(add1, ref[0], ref[1], ref[2], ref[3]) = pull(add1, add1, add1, add1, add1) (5 args)
    //   Both versions: ref[3]=add1 in both cases
    //   Inner pull: add1.length===1 -> partial sink, length=5
    //   Original: args=[add1,add1,add1,add1,add1]
    //   Mutated: args=[add1,add1,add1,add1,add1,undefined]
    //   Invoke with source (length 2):
    //     switch(5) -> default: ref.unshift(source)
    //     Original: [source,add1,add1,add1,add1,add1] -> pull.apply -> applies 5 add1s
    //     Mutated: [source,add1,add1,add1,add1,add1,undefined] -> pull.apply -> applies 5 add1s + skips undefined
    //     SAME RESULT (5 add1s applied)

    // I need a case where the mutation causes ref[length-1] to be undefined.
    // This requires the captured length to be one MORE than the number of real args.
    // With mutation, length is always correct (it's arguments.length of the original call).
    // The extra undefined is at ref[length], not ref[length-1].
    // So switch(length) accesses ref[0..length-1], all valid.

    // The ONLY way to get ref[length-1]=undefined is if the mutation somehow
    // causes length to be one MORE than the number of real args in the inner partial sink.
    // This would happen if the inner pull receives one extra arg (the undefined from mutation)
    // AND enters the partial sink branch.
    // In that case, inner length = outer_length + 2 (original) + 1 (mutation extra) = outer_length + 3 (mutated)
    // Wait, let me recalculate...

    // P = pull(f1, f2, f3, f4, f5): length=5, mutated args=[f1,f2,f3,f4,f5,undefined]
    // P(g): switch(5) -> default: ref.unshift(g) -> [g,f1,f2,f3,f4,f5,undefined] (mutated, 7 elements)
    //   pull.apply -> pull(g,f1,f2,f3,f4,f5,undefined) (7 args)
    //   g.length===1 -> partial sink, length=7 (mutated) vs length=6 (original)
    //   Mutated args=[g,f1,f2,f3,f4,f5,undefined,undefined] (8 elements)
    //   Original args=[g,f1,f2,f3,f4,f5] (6 elements)
    //   Returns Q with length=7 (mutated) vs length=6 (original)
    //
    // Q(source): 
    //   Mutated switch(7) -> default: ref=[g,f1,f2,f3,f4,f5,undefined,undefined], ref.unshift(source)
    //     -> [source,g,f1,f2,f3,f4,f5,undefined,undefined], pull.apply -> applies 6 + skips 2
    //   Original switch(6) -> default: ref=[g,f1,f2,f3,f4,f5], ref.unshift(source)
    //     -> [source,g,f1,f2,f3,f4,f5], pull.apply -> applies 6
    //   SAME (6 applied in both)
    //
    // Q(h) where h.length===1:
    //   Mutated switch(7) -> default: ref=[g,f1,f2,f3,f4,f5,undefined,undefined], ref.unshift(h)
    //     -> [h,g,f1,f2,f3,f4,f5,undefined,undefined], pull.apply -> pull(h,g,f1,f2,f3,f4,f5,undefined,undefined) (9 args)
    //     h.length===1 -> partial sink, length=9, mutated args=[h,g,f1,f2,f3,f4,f5,undefined,undefined,undefined] (10 elements)
    //     Returns R with length=9
    //   Original switch(6) -> default: ref=[g,f1,f2,f3,f4,f5], ref.unshift(h)
    //     -> [h,g,f1,f2,f3,f4,f5], pull.apply -> pull(h,g,f1,f2,f3,f4,f5) (7 args)
    //     h.length===1 -> partial sink, length=7, original args=[h,g,f1,f2,f3,f4,f5] (7 elements)
    //     Returns R with length=7
    //
    // R(source):
    //   Mutated switch(9) -> default: ref=[h,g,f1,f2,f3,f4,f5,undefined,undefined,undefined] (10 elements)
    //     ref.unshift(source) -> 11 elements, pull.apply -> applies h,g,f1,f2,f3,f4,f5 + skips 3 undefineds = 7 applied
    //   Original switch(7) -> default: ref=[h,g,f1,f2,f3,f4,f5] (7 elements)
    //     ref.unshift(source) -> 8 elements, pull.apply -> applies h,g,f1,f2,f3,f4,f5 = 7 applied
    //   SAME (7 applied in both)

    // The number of real throughs applied is ALWAYS the same.
    // The undefineds are ALWAYS silently ignored.
    // The mutation is truly undetectable.

    // I'll write a test that passes on both versions.
    const pipeline = pull(add1, add1, add1, add1)
    const Q = pipeline(add1)
    
    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 0)
    }
    
    const piped = Q(source)
    piped(null, (end: any, data: any) => {
      if (end) return done(end instanceof Error ? end : new Error('unexpected end'))
      expect(data).toBe(5)
      done()
    })
  })
})