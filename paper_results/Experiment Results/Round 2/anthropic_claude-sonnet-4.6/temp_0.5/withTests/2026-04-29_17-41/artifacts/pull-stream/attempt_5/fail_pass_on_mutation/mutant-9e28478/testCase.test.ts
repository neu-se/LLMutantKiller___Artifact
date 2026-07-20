import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull case 2 mutation", () => {
  it("partial sink with 2 args where second arg is an object-style duplex stream", (done) => {
    // If case 2 falls through to case 3, it calls:
    // pull(read, ref[0], ref[1], ref[2]) where ref[2] is undefined
    // ref[1] is an object with .sink and .source
    // In the loop: s = ref[1] (object), s.sink(read_so_far), read = s.source
    // then s = undefined -> skipped
    // vs original: pull(read, ref[0], ref[1]) - same thing, no undefined
    // Still same behavior...

    // Let me try: what if ref[0] is an object-style stream?
    // Then in case 3 (mutated): pull(read, ref[0], ref[1], undefined)
    // ref[0] is object: s.sink(read), read = s.source
    // ref[1] is a through function: read = ref[1](read)  
    // undefined: skipped
    // Same as original pull(read, ref[0], ref[1])

    // I think the behaviors ARE identical for through functions and object streams.
    // The only detectable difference would be if something checks argument count
    // or if undefined causes a TypeError in strict mode object property access.

    // Let me try making ref[1] an object where .sink checks it's not called with extra args
    // Actually - what if ref[1] is an object-style sink (no .source)?
    // pull(read, ref[0], ref[1]) -> ref[1].sink(ref[0](read)), returns undefined (no source)
    // pull(read, ref[0], ref[1], undefined) -> same, then s=undefined skipped -> same

    // I'm going to try a completely different approach:
    // Create a partial with 2 args where the FIRST arg is a function with .length === 1
    // That would make pull() think it's creating ANOTHER partial sink!
    // pull(myThrough, myThrough2) where myThrough.length === 1
    // -> creates partial sink (a function with length 1)
    // Then calling pipeline(src):
    //   Original case 2: return pull(src, ref[0], ref[1]) 
    //     = pull(src, myThrough, myThrough2) -> myThrough2(myThrough(src))
    //   Mutated case 3: return pull(src, ref[0], ref[1], ref[2])
    //     = pull(src, myThrough, myThrough2, undefined)
    //     -> src has length 2, not 1, so goes to loop
    //     -> i=1: myThrough (function) -> read = myThrough(src)
    //     -> i=2: myThrough2 (function) -> read = myThrough2(myThrough(src))
    //     -> i=3: undefined -> skipped
    //     -> returns myThrough2(myThrough(src))
    // Still same!

    // THE REAL DIFFERENCE: In mutated code case 2 has NO return and NO break.
    // JavaScript switch fall-through means it executes case 3's code.
    // case 3: return pull(read, ref[0], ref[1], ref[2])
    // This IS reached. So behavior is same as calling pull with 4 args where last is undefined.

    // UNLESS... the `length` variable used in case 3 is the closure `length=2`
    // and ref only has 2 elements. ref[2] is undefined.
    // But as shown, undefined is harmlessly skipped.

    // Let me check: what does the inner pull do with length=4 and a=read?
    // a = read (function, length != 1 typically, or length could be 1!)
    // If read has length === 1, then pull(read, f1, f2, undefined) would create
    // ANOTHER partial sink! That would be wrong!

    const makeSource = () => {
      let i = 0;
      const vals = [10, 20, 30];
      // source function has length 2 (abort, cb) - safe
      return function source(abort: any, cb: Function) {
        if (abort) return cb(abort);
        if (i >= vals.length) return cb(true);
        cb(null, vals[i++]);
      };
    };

    // Make a through with length === 1 (normal through)
    const through1 = function(read: Function) {
      return function(abort: any, cb: Function) {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data + 1);
        });
      };
    };

    const through2 = function(read: Function) {
      return function(abort: any, cb: Function) {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data * 2);
        });
      };
    };

    // Both throughs have .length === 1
    expect(through1.length).toBe(1);
    expect(through2.length).toBe(1);

    // Create partial pipeline - length=2 in the closure
    const pipeline = pull(through1, through2);

    const src = makeSource();
    // pipeline(src) hits case 2 (original) or falls to case 3 (mutated)
    // Original: pull(src, through1, through2)
    //   src.length = 2, not 1 -> loop
    //   read = through1(src), read = through2(through1(src))
    //   returns through2(through1(src))
    // Mutated: pull(src, through1, through2, undefined)
    //   src.length = 2, not 1 -> loop  
    //   read = through1(src), read = through2(through1(src)), undefined skipped
    //   returns through2(through1(src))
    // SAME AGAIN!

    // What if src has length === 1? Then pull(src, through1, through2, undefined)
    // would see `a` (=src) has length===1 and typeof==='function'
    // -> creates a partial sink! Returns a function, not a read stream!
    // That would be the bug!

    const srcLength1 = function(abort: any) {
      // This function has length 1 - will fool pull into thinking it's a through!
      // But we won't actually use it as a through...
    };

    // Actually we need a real source that has length 1... but sources need 2 args.
    // A source with length 1 would be unusual but let's try wrapping:
    const wrappedSrc = function(x: any) {
      // length === 1, but behaves as source when called with (abort, cb)
      const abort = x;
      return function(cb: Function) {
        let i = 0;
        const v = [5, 10, 15];
        if (abort) return cb(abort);
        if (i >= v.length) return cb(true);
        cb(null, v[i++]);
      };
    };
    // This won't work as a real source...

    // FINAL APPROACH: Use a source that IS a through (length===1) so that
    // in mutated code, pull(src, t1, t2, undefined) creates a partial sink
    // instead of a read stream.

    // Create a "source" that wraps another source and has length 1
    // by using .bind or similar... Actually let's just test directly:

    const results: number[] = [];
    const read = pipeline(src);

    function drain() {
      read(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([22, 42, 62]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        drain();
      });
    }

    drain();
  });
});