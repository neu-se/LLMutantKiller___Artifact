import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull case 2 mutation detection", () => {
  it("calling partial-sink-of-2 with a through as source should return a new partial sink that works", (done) => {
    const through1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data + 1);
      });
    };

    const through2 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data * 2);
      });
    };

    // through1.length === 1, through2.length === 1
    // pull(through1, through2) creates a partial sink (length=2 in closure)
    const pipeline = pull(through1, through2);
    // pipeline.length === 1

    // Now call pipeline with through1 as "source" (through1.length===1)
    // Original case 2: pull(through1, through1, through2)
    //   through1.length===1 -> creates partial with length=3
    //   args=[through1, through1, through2]
    //   This partial when called with real src:
    //     case 3: pull(src, through1, through1, through2)
    //     = through2(through1(through1(src)))
    //
    // Mutated falls to case 3: pull(through1, through1, through2, undefined)
    //   through1.length===1 -> creates partial with length=4
    //   args=[through1, through1, through2, undefined]
    //   This partial when called with real src:
    //     case 4: pull(src, through1, through1, through2, ref[3])
    //     ref[3]=undefined
    //     = pull(src, through1, through1, through2, undefined)
    //     = through2(through1(through1(src))) (undefined skipped)
    //
    // Still same result! Argh.

    // Let me try: what if the result of pipeline(through1) is used as a through
    // in yet another pull call?
    // result = pipeline(through1) 
    // Original: partial with length=3, result.length=1
    // Mutated: partial with length=4, result.length=1
    // Both have length=1. When used as through in pull(src, result):
    //   pull(src, result) -> src.length=2, loop: result(src)
    //   result(src) in original: case 3: pull(src, through1, through1, through2)
    //   result(src) in mutated: case 4: pull(src, through1, through1, through2, undefined)
    //   Both = through2(through1(through1(src)))
    // SAME!

    // I need to find a case where the extra undefined propagates and causes
    // a DIFFERENT number of throughs to be applied, or causes an error.
    
    // What if through2 is actually a SINK (consumes the stream)?
    // Then pull(src, through1, through1, through2) ends the pipeline.
    // pull(src, through1, through1, through2, undefined) also ends (undefined skipped).
    // Same!

    // NEW APPROACH: What if I make a through that COUNTS how many times it's called
    // as a constructor (i.e., how many times it receives a read function)?
    // In both original and mutated, each through is called exactly once. Same count.

    // COMPLETELY NEW APPROACH: Let me look at what happens with length===2 partial
    // when the SOURCE passed to it is undefined or null.
    // pipeline(undefined):
    //   Original: pull(undefined, through1, through2)
    //     a=undefined, typeof a !== 'function' -> read=undefined
    //     loop: through1(undefined) -> returns a function
    //           through2(that function) -> returns another function
    //     Returns through2(through1(undefined))
    //   Mutated: pull(undefined, through1, through2, undefined)
    //     Same + extra undefined skipped
    //     Returns through2(through1(undefined))
    // Same!

    // I'm going to try a fundamentally different approach.
    // Let me check if the mutation causes `case 2` to return `undefined`
    // by testing with a JavaScript engine that might not fall through.
    // Actually all JS engines follow the spec for fall-through.

    // WAIT - I just realized something. Let me re-read the mutated code:
    // case 2:
    // case 3: return pull(read, ref[0], ref[1], ref[2])
    //
    // This is standard fall-through. Case 2 falls to case 3's return.
    // pull(read, ref[0], ref[1], ref[2]) where ref.length=2, ref[2]=undefined.
    //
    // But what about the `length` variable? In the switch, `length` is the
    // closure variable = 2. But inside pull(read, ref[0], ref[1], ref[2]),
    // the NEW call's arguments.length = 4 (read, ref[0], ref[1], undefined).
    //
    // Hmm, what if ref[0] has length===1 AND ref[1] has length===1?
    // pull(read, ref[0], ref[1], undefined):
    //   a=read, length=4
    //   read.length !== 1 (assuming read is a real source with length=2)
    //   -> loop: ref[0](read), ref[1](ref[0](read)), undefined skipped
    //   Returns ref[1](ref[0](read)) ✓
    //
    // What if read.length===1?
    //   Creates partial with length=4
    //   When called with src: case 4: pull(src, read, ref[0], ref[1], ref[2])
    //     ref[2]=undefined (the 4th element of args=[read,ref[0],ref[1],undefined])
    //     = pull(src, read, ref[0], ref[1], undefined)
    //     src.length=2: loop: read(src), ref[0](read(src)), ref[1](...), undefined skip
    //     Returns ref[1](ref[0](read(src)))
    //
    // Original with read.length===1:
    //   Creates partial with length=3
    //   When called with src: case 3: pull(src, read, ref[0], ref[1])
    //     = pull(src, read, ref[0], ref[1])
    //     src.length=2: loop: read(src), ref[0](read(src)), ref[1](...)
    //     Returns ref[1](ref[0](read(src)))
    // SAME!

    // I give up trying to find a theoretical difference.
    // Let me just write a test that directly tests the behavior
    // and see if maybe I'm wrong about the fall-through.
    // Perhaps in the actual mutated file, case 2 has a BREAK (not fall-through)
    // and returns undefined.

    let i = 0;
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= 3) return cb(true);
      cb(null, ++i);
    };

    const pipeline2 = pull(through1, through2);
    const read = pipeline2(src);

    const results: number[] = [];
    function drain() {
      read(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([4, 6, 8]);
          done();
          return;
        }
        if (end) { done(end); return; }
        results.push(data);
        drain();
      });
    }
    drain();
  });
});