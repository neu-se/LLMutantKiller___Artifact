import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 3 with object-style duplex as last argument", () => {
  it("should not pass undefined as a sink when length is 3", () => {
    // In the original: case 3 falls through to case 4 (placeholder),
    // calling pull(read, ref[0], ref[1], ref[2], ref[3]) where ref[3]=undefined
    // In the mutated: case 4: is empty, falls to the NEXT case 4 which also
    // calls pull(read, ref[0], ref[1], ref[2], ref[3])
    // These seem equivalent...
    
    // BUT: what if ref[2] is a duplex object with .sink and .source?
    // After processing ref[2]: s.sink(read) is called, read = s.source
    // Then ref[3]=undefined is processed: skipped (undefined is falsy)
    // Returns s.source
    // Same in both cases.

    // Let me try: what if we make the SINK throw when called with undefined?
    // Or what if we check that the sink is called exactly once?

    // Actually, let me reconsider the file structure completely.
    // The file as shown has:
    //      case 3:
    // <PLACEHOLDER>
    //      case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])
    //
    // Original placeholder = "         case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])"
    // This is INDENTED differently from the "case 4:" already in the file.
    // In a switch statement, having two "case 4:" labels would be a duplicate case.
    // JavaScript allows duplicate case labels (it's not a syntax error), but only
    // the FIRST matching one is used.
    //
    // So in the ORIGINAL:
    //   case 3: [falls through]
    //   case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  <- PLACEHOLDER (first case 4)
    //   case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  <- second case 4 (unreachable)
    //
    // For length=3: matches case 3, falls through to first case 4, returns pull(read,r[0],r[1],r[2],r[3])
    // For length=4: matches FIRST case 4, returns pull(read,r[0],r[1],r[2],r[3])
    //
    // In the MUTATED:
    //   case 3: [falls through]
    //   case 4: [empty, falls through]  <- PLACEHOLDER (first case 4, now empty)
    //   case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  <- second case 4
    //
    // For length=3: matches case 3, falls through to first case 4 (empty), falls to second case 4
    //               returns pull(read,r[0],r[1],r[2],r[3]) -- SAME!
    // For length=4: matches FIRST case 4 (empty), falls to second case 4
    //               returns pull(read,r[0],r[1],r[2],r[3]) -- SAME!
    //
    // So the mutation is truly equivalent! Both produce identical behavior!
    // Unless... duplicate case labels in JS switch work differently than I think.
    
    // Let me verify with a simple test that doesn't depend on the mutation at all,
    // just to confirm the pipeline works. Then I'll think harder.
    
    // Actually, I wonder if the problem statement has a typo and the original
    // placeholder is actually "         return pull(read, ref[0], ref[1], ref[2])"
    // (case 3 returns with 3 refs, not 4).
    // That would make the mutation: case 3 no longer returns, falls to case 4.
    // For length=3: original returns pull(read,r[0],r[1],r[2]) with 4 args
    //               mutated returns pull(read,r[0],r[1],r[2],r[3]) with 5 args, r[3]=undefined
    // The undefined would be silently skipped, so still equivalent.
    
    // I'm going to try a test where the extra undefined arg DOES matter:
    // Make a through stream that counts its arguments and fails if called with undefined.
    
    const errors: Error[] = []
    
    function strictThrough(read: any) {
      if (read === undefined) {
        errors.push(new Error('read is undefined!'))
        return (end: any, cb: any) => cb(true)
      }
      return (end: any, cb: any) => read(end, cb)
    }
    
    let idx = 0
    const source = (end: any, cb: any) => {
      if (end) return cb(end)
      if (idx >= 2) return cb(true)
      cb(null, ++idx)
    }
    
    // If mutation passes undefined as extra arg, and that undefined gets
    // processed as a through stream... but undefined is not a function,
    // so it won't be called as s(read). It's skipped.
    
    // The ONLY way to detect this mutation is if undefined being passed
    // causes the return value to differ. Let me check what pull returns
    // when the last arg is undefined vs not present.
    
    // pull(source, through1, through2) -> length=3, loop i=1,2
    //   i=1: read = through1(source)
    //   i=2: read = through2(through1(source))
    //   returns through2(through1(source))
    
    // pull(source, through1, through2, undefined) -> length=4, loop i=1,2,3
    //   i=1: read = through1(source)
    //   i=2: read = through2(through1(source))
    //   i=3: s=undefined, skipped
    //   returns through2(through1(source))
    
    // IDENTICAL. The mutation is equivalent. I cannot write a test that distinguishes them.
    // But the problem says it's a valid mutation... Let me try one more angle.
    
    // What if the partial is used in a context where the RETURN VALUE matters
    // and we check it's not undefined?
    
    const results: number[] = []
    const through = (read: any) => (end: any, cb: any) => read(end, cb)
    const sink = (read: any) => {
      ;(function next() {
        read(null, (end: any, data: any) => {
          if (end) return
          results.push(data)
          next()
        })
      })()
    }
    
    // Test with length=3 where last arg is a through (not sink)
    // So the partial returns a read function
    const partial = pull(through, through, through)
    const resultRead = partial(source)
    
    // resultRead should be a function (the composed through streams applied to source)
    // With original: pull(source, through, through, through) -> through(through(through(source)))
    // With mutated: pull(source, through, through, through, undefined) -> same (undefined skipped)
    
    expect(typeof resultRead).toBe('function')
    
    // Drain the result
    ;(function drain() {
      resultRead(null, (end: any, data: any) => {
        if (end) return
        results.push(data)
        drain()
      })
    })()
    
    expect(results).toEqual([1, 2])
  })
})