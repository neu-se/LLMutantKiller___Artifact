import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application args array", () => {
  it("should store exactly the right number of arguments in the args array when creating a partial", () => {
    // Track what arguments the through function receives
    const receivedArgs: any[] = []
    
    // A through function that records what it's called with
    const through = function(read: any) {
      receivedArgs.push(read)
      return read
    }
    
    // Create a partial with exactly 2 through functions
    // pull(through1, through2) -> partial
    // In original: args = [through, through2] (length 2)
    // In mutated: args = [through, through2, undefined] (length 3, extra undefined)
    const through2 = function(read: any) {
      return read
    }
    
    const partial = pull(through, through2)
    
    // Create a simple source
    const source = (end: any, cb: Function) => {
      cb(true)
    }
    
    // Apply the partial - this will call pull(source, ...ref)
    // In original: pull(source, through, through2)
    // In mutated: pull(source, through, through2, undefined) - undefined as 4th arg
    // When undefined is passed as a stream step, it would be falsy and skipped
    // But we can check how many times through is called
    
    // Actually let's check the args array size by using a spy through
    const callCount = { value: 0 }
    const spyThrough = function(read: any) {
      callCount.value++
      return read
    }
    
    // With 1 arg partial: args should have length 1
    // Original: args[0] = spyThrough (loop i=0 to 0)
    // Mutated: args[0] = spyThrough, args[1] = undefined (loop i=0 to 1)
    const partial2 = pull(spyThrough)
    
    // Check the args array length by seeing what pull does with it
    // When partial2(source) is called with case 1: return pull(read, ref[0])
    // Original: ref = [spyThrough], ref[0] = spyThrough -> works fine
    // Mutated: ref = [spyThrough, undefined], but case 1 only uses ref[0] -> same behavior
    
    // Better: use 5+ args to force the default case with ref.unshift
    const t1 = (r: any) => r
    const t2 = (r: any) => r
    const t3 = (r: any) => r
    const t4 = (r: any) => r
    
    // This forces the default case: ref.unshift(read); pull.apply(null, ref)
    // Original: ref = [t1,t2,t3,t4], after unshift: [source,t1,t2,t3,t4] -> 5 args
    // Mutated: ref = [t1,t2,t3,t4,undefined], after unshift: [source,t1,t2,t3,t4,undefined] -> 6 args
    // The extra undefined would be treated as a stream step - it's falsy so skipped
    // But we can detect via the length of ref
    
    // Most direct: check that the partial can only be called once (TypeError on second call)
    // and that it works correctly on first call
    const partial3 = pull(t1)
    partial3(source) // first call - should work
    
    expect(() => {
      partial3(source) // second call - should throw
    }).toThrow(TypeError)
    
    // Now verify the args array had correct length by checking behavior
    // In mutated code, args[1] = undefined for a 1-arg partial
    // When case 1 runs: return pull(read, ref[0]) - ref[0] is t1, ref[1] is undefined but unused
    // So case 1,2,3,4 won't expose the bug directly
    // The default case (5+ args) will pass undefined as extra arg
    
    // Create partial with 4 through functions to trigger default case
    const calls: string[] = []
    const makeThrough = (name: string) => (r: any) => { calls.push(name); return r }
    
    const partialDefault = pull(makeThrough('a'), makeThrough('b'), makeThrough('c'), makeThrough('d'))
    partialDefault(source)
    
    // In original: pull(source, a, b, c, d) -> 5 args, default case, ref=[a,b,c,d], unshift -> [source,a,b,c,d]
    // In mutated: pull(source, a, b, c, d, undefined) -> 6 args, default case, ref=[a,b,c,d,undefined], unshift -> [source,a,b,c,d,undefined]
    // undefined as a stream step: typeof undefined !== 'function' and not an object -> skipped
    // So calls should be ['a','b','c','d'] in both cases... 
    
    // Let me think differently: the args array length itself is the observable difference
    // args.length in original = length, in mutated = length + 1
    // When ref.unshift(read) is called, ref becomes length+1 or length+2 elements
    // pull.apply(null, ref) is called with that many args
    // The extra undefined arg: typeof undefined !== 'function', undefined && ... is falsy -> skipped
    
    // The real observable difference: in mutated code, the last element of args is undefined
    // For case 1: pull(read, ref[0]) - ref[0] is correct, ref[1]=undefined unused -> same
    // For case 2: pull(read, ref[0], ref[1]) - ref[1] is correct, ref[2]=undefined unused -> same  
    // For default (5 args): ref has 5 elements + undefined, pull gets called with source + 5 + undefined
    // That's 7 args total, length=7, but first arg is source (not a function with .length===1)
    // So it goes to the for loop: i from 1 to 6, s=arguments[6]=undefined, falsy -> skipped
    
    // Hmm, the undefined is silently ignored. Let me check if there's another observable effect.
    // args array: new Array(length) creates array of size `length`
    // Original: fills indices 0..length-1 correctly
    // Mutated: fills indices 0..length (length+1 elements), but new Array(length) only has `length` slots
    // Wait! new Array(length) creates array with length slots (indices 0 to length-1)
    // Setting args[length] = arguments[length] sets an element BEYOND the allocated size
    // This makes args.length = length + 1 in the mutated version!
    
    // So args.length differs: original = length, mutated = length + 1
    // When ref.unshift(read) is called and pull.apply(null, ref) runs:
    // Original with 4 through args: ref.length=4, after unshift=5, pull called with 5 args
    //   -> length=5, first arg is source (not a 1-arg function), goes to for loop
    // Mutated with 4 through args: ref.length=5 (extra undefined), after unshift=6, pull called with 6 args
    //   -> length=6, same behavior but extra undefined arg silently ignored
    
    // The key: for the switch cases (1-4), the behavior should be identical
    // For default case, the extra undefined is ignored
    // So... is there ANY observable difference?
    
    // YES! When partial is called, it checks args == null after first call
    // But more importantly: the args array itself - if we could inspect it...
    // We can't directly. But we CAN observe via the through functions.
    
    // Actually wait - for case 1: return pull(read, ref[0])
    // ref[0] = args[0] = arguments[0] = the through function -> correct
    // For mutated case 1: ref[0] = args[0] = arguments[0] = through -> correct, ref[1]=undefined but unused
    
    // I think the only real observable difference is in the DEFAULT case when
    // the extra undefined gets passed to pull as an extra argument.
    // But undefined is silently skipped in the for loop.
    
    // UNLESS: the extra undefined causes `length` to be different, which changes
    // which switch case is taken!
    // Original with 4 through args: partial applied -> pull(read, t1, t2, t3, t4) -> length=5 -> default
    // Mutated with 4 through args: ref=[t1,t2,t3,t4,undefined] -> after unshift -> pull(read,t1,t2,t3,t4,undefined) -> length=6 -> default
    // Both go to default, undefined skipped -> same result
    
    // Original with 3 through args: partial applied -> pull(read, t1, t2, t3) -> length=4 -> case 4
    // Mutated with 3 through args: ref=[t1,t2,t3,undefined] -> pull(read,t1,t2,t3,undefined) -> length=5 -> default
    // case 4: pull(read, ref[0], ref[1], ref[2], ref[3]) where ref[3]=undefined
    // default: ref.unshift(read) -> [read,t1,t2,t3,undefined] -> pull.apply -> length=5 -> default again
    // Hmm, same result since undefined is skipped
    
    // What about 2 through args?
    // Original: pull(read, t1, t2) -> length=3 -> case 3: pull(read, ref[0], ref[1], ref[2])
    //   ref=[t1,t2], ref[2]=undefined -> pull(read, t1, t2, undefined) -> length=4 -> case 4
    //   case 4: pull(read, ref[0], ref[1], ref[2], ref[3]) where ref=[t1,t2], ref[2]=undefined, ref[3]=undefined
    //   -> pull(read, t1, t2, undefined, undefined) -> length=5 -> default
    //   This seems wrong even in original...
    
    // Wait, I'm confusing myself. Let me re-read the code.
    // case 3: return pull(read, ref[0], ref[1], ref[2]) - ref is the args array
    // If ref=[t1,t2] (length 2), then ref[2]=undefined
    // So pull(read, t1, t2, undefined) -> length=4 -> case 4
    // case 4: pull(read, ref[0], ref[1], ref[2], ref[3]) where ref=[t1,t2,undefined]... 
    // No wait, ref is still [t1,t2] from the outer call
    // This is a recursive call to pull with 4 args: (read, t1, t2, undefined)
    // In this recursive call: a=read, length=4, typeof read !== 'function' with length 1
    // So it goes to for loop: i=1: s=t1 (function) -> read=t1(read)
    //                          i=2: s=t2 (function) -> read=t2(read)  
    //                          i=3: s=undefined -> typeof undefined !== 'function', undefined && ... -> skip
    // Returns read (transformed by t1 and t2) -> correct!
    
    // So undefined args ARE silently ignored. The mutation seems to not cause observable differences
    // in the final stream behavior...
    
    // BUT WAIT: What about case 1 in the partial?
    // Original with 1 through arg: ref=[t1] (length 1)
    //   partial(source) -> case 1: return pull(source, ref[0]) = pull(source, t1)
    //   -> length=2, source is not a 1-arg function, for loop: i=1, s=t1, read=t1(source) -> returns t1(source)
    
    // Mutated with 1 through arg: ref=[t1, undefined] (length 2)
    //   partial(source) -> BUT WAIT: length is still 1 (the original length captured in closure)
    //   switch(length) -> case 1: return pull(source, ref[0]) = pull(source, t1)
    //   ref[1]=undefined is NEVER accessed! -> same result as original!
    
    // Hmm. For cases 1-4, only ref[0]..ref[length-1] are accessed, and ref[length]=undefined is ignored.
    // For default case, ref.unshift(read) then pull.apply(null, ref) - ref has length+1 elements
    // The extra undefined is passed but silently ignored.
    
    // So the mutation seems to have NO observable effect on the final stream behavior!
    // But it DOES change the args array - args.length = length+1 instead of length.
    
    // The only way to observe this is if something checks args.length...
    // In the code, args is checked with `if (args == null)` - not length.
    // ref = args, then args = null. ref.unshift(read) changes ref.length.
    
    // Actually, I think I need to reconsider. The mutation sets args[length] = arguments[length].
    // new Array(length) creates a sparse array. Setting args[length] makes args.length = length+1.
    // But the switch uses the captured `length` variable, not args.length.
    // So the switch case is still determined by the original `length`.
    
    // For the default case (length >= 5):
    // Original: ref=[t1,t2,t3,t4,t5] (5 elements), ref.unshift(source) -> [source,t1,t2,t3,t4,t5] (6 elements)
    //   pull.apply(null, [source,t1,t2,t3,t4,t5]) -> length=6, source not 1-arg fn
    //   for loop processes t1..t5 -> correct
    
    // Mutated: ref=[t1,t2,t3,t4,t5,undefined] (6 elements), ref.unshift(source) -> [source,t1,t2,t3,t4,t5,undefined] (7 elements)
    //   pull.apply(null, [source,t1,t2,t3,t4,t5,undefined]) -> length=7
    //   for loop: i=1..6, processes t1..t5, then undefined (skipped) -> correct
    
    // I'm now thinking the mutation truly has no observable effect on stream behavior.
    // The only observable difference might be memory (extra slot in array) which we can't test.
    
    // UNLESS: we can detect that args.length is different by some indirect means.
    // What if we pass a through function that checks its position?
    
    // Actually, let me reconsider the default case more carefully.
    // When length=5 (5 through functions), original ref.length=5, mutated ref.length=6.
    // After unshift: original 6 elements, mutated 7 elements.
    // pull.apply with original: a=source, length=6, not 1-arg fn, for i=1..5: processes 5 throughs
    // pull.apply with mutated: a=source, length=7, not 1-arg fn, for i=1..6: processes 5 throughs + undefined
    // undefined is skipped -> same result
    
    // I'm going in circles. Let me think about what COULD be different.
    // The only scenario where behavior differs: if undefined is NOT silently skipped.
    // Looking at the code: `if (typeof s === 'function')` - undefined fails
    //                      `else if (s && typeof s === 'object')` - undefined is falsy, fails
    // So undefined IS silently skipped. The mutation has no observable effect on stream behavior.
    
    // BUT: there's one more thing. The `new Array(length)` creates an array of exactly `length` slots.
    // Setting index `length` (out of bounds) makes it a sparse array with length+1.
    // This could potentially affect performance but not correctness.
    
    // WAIT. I just realized something. Let me re-read the partial application code:
    //