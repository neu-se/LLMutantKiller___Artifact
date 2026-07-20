import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should handle length=3 partial where case 3 originally falls through to case 4 with ref[3]=undefined", () => {
    // The key insight: in the ORIGINAL code, case 3 falls through to case 4 (the placeholder),
    // calling pull(read, ref[0], ref[1], ref[2], ref[3]) where ref[3] is undefined.
    // In the MUTATED code, case 4 (placeholder) becomes empty, falling to the SECOND case 4,
    // which also calls pull(read, ref[0], ref[1], ref[2], ref[3]).
    // These are equivalent...
    
    // BUT: what if ref[2] is a function with length === 1?
    // Then in the recursive pull call with 5 args (read + 4 refs):
    // a = read (the source, length=2), NOT a 1-arity function, so no partial created.
    // Loop processes all 4 args including undefined. Same result.
    
    // What if the SOURCE passed to the partial has length === 1?
    // Then pull(source_1arity, ref[0], ref[1], ref[2]) would create a partial!
    // And pull(source_1arity, ref[0], ref[1], ref[2], undefined) would create a DIFFERENT partial!
    // The first partial has length=4, the second has length=5.
    // When called with another source:
    //   length=4 partial: case 4, returns pull(src2, source_1arity, ref[0], ref[1], ref[2])
    //   length=5 partial: default, ref.unshift(src2), pull(src2, source_1arity, ref[0], ref[1], ref[2], undefined)
    // Still equivalent (undefined skipped)!
    
    // I think the ONLY real detectable difference would be if we could observe
    // the NUMBER of arguments passed to the recursive pull call.
    // We can do this by wrapping pull itself... but that's testing implementation.
    
    // Let me try a completely different approach: test that a through stream
    // that is sensitive to receiving undefined does NOT receive undefined.
    // Specifically: make ref[2] a through that returns a read function,
    // and then check that no extra undefined is passed after it.
    
    // Actually, the undefined is passed as an ARGUMENT to pull, not to the through.
    // The through receives `read` (the accumulated read function), not undefined.
    // undefined is only processed in the loop where it's skipped.
    
    // I'm going to try yet another angle: what if we use pull in a way where
    // the return value of the partial application is then used as input to another pull,
    // and the chain length matters?
    
    // OR: what if we test with a through stream that wraps pull itself?
    
    // Let me look at this from a pure "what can go wrong" perspective:
    // The mutation changes case 3 behavior (length=3 partial).
    // Original: pull(read, ref[0], ref[1], ref[2]) - 4 args total
    // Mutated: pull(read, ref[0], ref[1], ref[2], undefined) - 5 args total
    
    // In the recursive call, length=4 vs length=5.
    // For length=4: switch case 4, returns pull(read2, s[0], s[1], s[2], s[3])
    //   where s = [ref[0], ref[1], ref[2]] (only 3 elements), s[3]=undefined
    //   This is ANOTHER recursive call with 5 args!
    //   In THAT call, length=5, a=read2 (length 2), loop runs i=1..4
    //   i=4: s=undefined, skipped. Returns ref[2](ref[1](ref[0](read2)))
    
    // For length=5: switch default, ref.unshift(read), pull.apply(null, ref)
    //   ref was [ref[0], ref[1], ref[2], undefined], after unshift: [read, ref[0], ref[1], ref[2], undefined]
    //   pull(read, ref[0], ref[1], ref[2], undefined) - 5 args
    //   In THAT call, length=5, a=read (length 2), loop runs i=1..4
    //   i=4: s=undefined, skipped. Returns ref[2](ref[1](ref[0](read)))
    
    // STILL IDENTICAL. The mutation is truly equivalent in all cases I can find.
    
    // Let me just try to write a test that verifies the pipeline works correctly
    // for a 3-arg partial and see if there's any edge case I'm missing in practice.
    
    // One last idea: what if ref[0] is a through with length=1, and the source
    // passed to the partial ALSO has length=1? Then the recursive pull creates
    // yet another partial. Let me trace this carefully.
    
    // partial = pull(t1, t2, t3) where all have length=1, length=3
    // partial(src) where src.length=1:
    //   Original case 3: pull(src, t1, t2, t3) 
    //     -> src.length=1, creates partial with length=4, args=[src,t1,t2,t3]
    //     -> returns function p2
    //   Mutated case 4: pull(src, t1, t2, t3, undefined)
    //     -> src.length=1, creates partial with length=5, args=[src,t1,t2,t3,undefined]
    //     -> returns function p2_mut
    
    // Now call p2(realSource) and p2_mut(realSource):
    //   p2: length=4, case 4: pull(realSource, src, t1, t2, t3)
    //     -> realSource.length != 1 (assume length=2), loop applies all 4
    //     -> returns t3(t2(t1(src(realSource))))... wait, src is a through here
    //     -> t3(t2(t1(src_through(realSource))))
    //   p2_mut: length=5, default: ref.unshift(realSource)
    //     -> pull(realSource, src, t1, t2, t3, undefined)
    //     -> loop applies src, t1, t2, t3, skips undefined
    //     -> returns t3(t2(t1(src_through(realSource))))
    
    // SAME RESULT AGAIN.
    
    // I am convinced this mutation is equivalent. But let me try one more thing:
    // test with a through that has length=1 as the LAST arg (ref[2]),
    // and source with length=1, to create a chain of partials.
    
    // Actually, you know what, let me just try to write a test that
    // empirically checks if there's any difference by testing the actual
    // behavior with various configurations and see what happens.
    
    const results: number[] = []
    
    // Make a source with length=1 (one parameter function)
    const makePartialSource = (values: number[]) => {
      let i = 0
      // This function has length=1, so pull will treat it as a "through" for partial application
      const f = function(cb: any) {
        // This is not a valid pull-stream source, but let's see what happens
      }
      return f
    }
    
    // Actually let me just test the straightforward case one more time
    // but with a through that THROWS if it receives undefined
    
    function safeThrough(read: any) {
      if (typeof read !== 'function') {
        throw new TypeError(`Expected function, got ${typeof read}`)
      }
      return (end: any, cb: any) => read(end, cb)
    }
    
    let srcIdx = 0
    const src = (end: any, cb: any) => {
      if (end) return cb(end)
      if (srcIdx >= 2) return cb(true)
      cb(null, ++srcIdx)
    }
    
    // 3-arg partial with safeThrough as last arg
    // If mutation passes undefined as 4th arg to recursive pull,
    // and that undefined gets passed to safeThrough... but it won't,
    // because undefined is checked with typeof s === 'function' first.
    
    // I truly cannot find a behavioral difference. Let me just submit
    // the most direct test possible.
    const p = pull(safeThrough, safeThrough, safeThrough)
    const readFn = p(src)
    
    expect(typeof readFn).toBe('function')
    
    ;(function drain() {
      readFn(null, (end: any, data: any) => {
        if (end) return
        results.push(data)
        drain()
      })
    })()
    
    expect(results).toEqual([1, 2])
  })
})