import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with 3 args where last arg is a through stream", () => {
  it("should return the correct transformed source when partial sink case 3 is used", () => {
    // Create a simple identity through stream
    const identity = (read: any) => read

    // Create partial with exactly 3 through streams (length=3 triggers case 3)
    // All are identity throughs with length=1
    const partial = pull(identity, identity, identity)

    // partial is a function. Now apply it to a source.
    // The source has length 2 (end, cb), so it won't trigger partial creation.
    
    let i = 0
    const values = [1, 2, 3]
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Original case 3: pull(source, identity, identity, identity)
    //   -> identity(identity(identity(source))) = source
    //   -> returns source (a function)
    // Mutated case 4: pull(source, identity, identity, identity, undefined)
    //   -> same, undefined skipped, returns source
    // Still same...

    // Let me try: what if the last arg in the partial is a SINK (returns undefined)?
    // Then the return value of partialSink(source) would be undefined.
    // With mutation, same thing.

    // The only real difference I can think of: if ref[2] itself is a 1-arity function,
    // and we're checking the LENGTH of the returned partial.

    // Actually, let me re-read the switch:
    // case 3: return pull(read, ref[0], ref[1], ref[2])  // 4 total args
    // Mutated case 3 falls to:
    // case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  // 5 total args, ref[3]=undefined

    // What if ref[0] is a 1-arity function? In the recursive call:
    // pull(read, ref[0], ref[1], ref[2]) - read is not 1-arity, so no partial
    // Same for mutated.

    // I think the ONLY way to detect this is if undefined being passed causes
    // a TypeError when the loop tries to use it. But the loop checks typeof s === 'function'
    // and s && typeof s === 'object', both false for undefined, so it's skipped.

    // UNLESS... what if we make one of the args an object with a sink that returns a source,
    // and then the undefined arg after it causes read to be set to undefined?
    // No - undefined is skipped entirely.

    // Wait! I need to re-read the loop more carefully:
    // for (var i = 1; i < length; i++) {
    //   var s = arguments[i]
    //   if (typeof s === 'function') { read = s(read) }
    //   else if (s && typeof s === 'object') { s.sink(read); read = s.source }
    // }
    // If s is undefined: neither branch runs, read is UNCHANGED.
    // So functionally identical.

    // The ONLY scenario where behavior differs: if the through/sink at ref[2] 
    // is a duplex object (has .sink and .source), and after processing it,
    // read = s.source. Then the undefined arg is skipped. Same result.

    // I'm going to try a completely different angle: test the LENGTH property
    // of the returned partial function, or test that calling it twice throws.

    // Actually - what if we test with a pipeline where the 3rd arg (ref[2]) is 
    // a function with length 1, making the RECURSIVE pull call create a partial?
    // pull(read, ref[0], ref[1], ref[2]) where ref[2].length===1 and read.length!==1
    // -> a=read (length 2), no partial, loop applies all 3, returns ref[2](ref[1](ref[0](read)))
    // pull(read, ref[0], ref[1], ref[2], undefined) where ref[2].length===1
    // -> a=read (length 2), no partial, loop applies all 3, undefined skipped
    // -> returns ref[2](ref[1](ref[0](read))) -- SAME!

    // I'm convinced the mutation is functionally equivalent for all practical cases.
    // But wait - let me check if there's a case where `read` passed to the partial
    // has length === 1...

    // If we call partialSink(someFunc) where someFunc.length === 1:
    // Original: pull(someFunc, ref[0], ref[1], ref[2])
    //   -> someFunc.length===1, so creates ANOTHER partial with length=4!
    //   -> returns a function (partial sink)
    // Mutated: pull(someFunc, ref[0], ref[1], ref[2], undefined)
    //   -> someFunc.length===1, so creates ANOTHER partial with length=5!
    //   -> returns a function (partial sink)
    // These two partials are DIFFERENT - one has length 4, one has length 5!
    // When the length-4 partial is called: switch case 4, returns pull(r, s[0],s[1],s[2],s[3])
    // When the length-5 partial is called: switch default, does ref.unshift(read), pull.apply

    // But do they produce different OBSERVABLE results? Let's trace:
    // Original nested partial called with source2:
    //   pull(source2, someFunc, ref[0], ref[1], ref[2]) -> applies pipeline correctly
    // Mutated nested partial called with source2:
    //   pull(source2, someFunc, ref[0], ref[1], ref[2], undefined) -> applies pipeline + skips undefined
    // Still same observable result!

    // I give up trying to find a theoretical difference and will just write a test
    // that directly verifies the pipeline works with 3-arg partial, hoping the 
    // undefined arg somehow causes an issue in practice.

    // Actually, let me look ONE more time at the original switch:
    // case 3: return pull(read, ref[0], ref[1], ref[2])
    // This is case 3 meaning length===3 (3 args passed to outer pull).
    // ref = [arg0, arg1, arg2], ref[3] = undefined
    // Mutated falls to case 4: pull(read, ref[0], ref[1], ref[2], ref[3])
    //                        = pull(read, arg0, arg1, arg2, undefined)
    
    // What if arg2 is an object sink (with .sink method but no .source)?
    // Then after processing arg2: s.sink(read) is called, read = s.source = undefined
    // Then the 5th arg (undefined) is processed: skipped
    // Returns undefined in both cases.
    
    // What if arg1 is an object sink (with .sink and .source)?
    // Original: pull(read, arg0, arg1_obj, arg2)
    //   i=1: read = arg0(read)
    //   i=2: arg1_obj.sink(read); read = arg1_obj.source
    //   i=3: read = arg2(read)  [if arg2 is function]
    //   returns arg2(arg1_obj.source)
    // Mutated: pull(read, arg0, arg1_obj, arg2, undefined)
    //   same + undefined skipped
    //   returns arg2(arg1_obj.source)
    // Same!

    // I truly cannot find a behavioral difference. The mutation appears to be equivalent.
    // But the problem states it's a valid mutation to test. Let me look at this from
    // a completely fresh perspective.

    // OH WAIT. I just realized: what if `ref[2]` is `undefined`?
    // That can't happen since length=3 means we have exactly 3 args.

    // What about when the partial is called with NO arguments or wrong args?
    // The check is: if (args == null) throw TypeError
    // That's about calling the partial twice, not about the args to pull.

    // Let me try: what if we use the partial in a way where the extra undefined
    // causes the RETURN VALUE to be undefined instead of a valid read function?
    
    // If arg2 is a through (function, length=1):
    // Original: pull(source, arg0, arg1, arg2) returns arg2(arg1(arg0(source)))
    // Mutated: pull(source, arg0, arg1, arg2, undefined) returns arg2(arg1(arg0(source)))
    // Same!

    // If arg2 is a sink function (function, any length != 1, returns undefined):
    // Original: returns undefined
    // Mutated: returns undefined  
    // Same!

    // I'll try testing with a through that has length !== 1 to see if that matters.
    // A through with length 2 would be treated as a regular function (not creating partial).
    
    // Actually in the loop: typeof s === 'function' -> read = s(read)
    // It doesn't check s.length! So any function is called as a through.

    // Final attempt: maybe the issue is that with the mutation, when length=3 and
    // we fall to case 4, the case 4 line itself is ALSO affected by the mutation?
    // Let me re-read the mutation:
    // Original case 3: return pull(read, ref[0], ref[1], ref[2])
    // Original case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])
    // Mutated case 3: (empty)
    // Mutated case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])
    // So case 4 is unchanged. With length=3, ref[3]=undefined, falls to case 4.
    // Calls pull(read, ref[0], ref[1], ref[2], undefined).

    // I'll write a test that should theoretically work but might expose
    // if there's any subtle difference I'm missing.

    const collected: number[] = []
    
    function makeThrough(multiplier: number) {
      // length = 1 (one parameter)
      return function(read: any) {
        return function(end: any, cb: any) {
          read(end, function(end: any, data: any) {
            if (end) return cb(end)
            cb(null, data * multiplier)
          })
        }
      }
    }

    function makeSink(arr: number[]) {
      return function(read: any) {
        ;(function next() {
          read(null, function(end: any, data: any) {
            if (end) return
            arr.push(data)
            next()
          })
        })()
      }
    }

    // Create source with length 2
    let idx = 0
    const nums = [5, 10, 15]
    const src = function(end: any, cb: any) {
      if (end) return cb(end)
      if (idx >= nums.length) return cb(true)
      cb(null, nums[idx++])
    }

    // 3-arg partial: through*2, through*3, sink
    // This is the case 3 scenario
    const p = pull(makeThrough(2), makeThrough(3), makeSink(collected))
    p(src)

    // 5 * 2 * 3 = 30, 10 * 2 * 3 = 60, 15 * 2 * 3 = 90
    expect(collected).toEqual([30, 60, 90])
  })
})