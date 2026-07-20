import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation detection", () => {
  it("should correctly apply exactly 2 transforms in partial application with length=2", (done) => {
    let i = 0;
    const values = [10];

    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    }

    function add5(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 5);
        });
      };
    }

    function mul3(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 3);
        });
      };
    }

    // length === 2: original case 2 -> pull(read, ref[0], ref[1])
    // mutated: case 3 (duplicate) -> pull(read, ref[0], ref[1], ref[2]) where ref[2]=undefined
    // With undefined as 3rd transform: typeof undefined !== 'function', undefined && ... = false
    // So undefined is skipped - same result?

    // BUT: if source.length === 1, then pull(source, add5, mul3, undefined) with length=4
    // enters partial app! args=[source, add5, mul3, undefined]
    // returns fn(read2) { switch(4) -> case 4: pull(read2, source, add5, mul3, undefined) }
    // This is very different from original!

    // Make a source with length === 1
    function source1(end: any) {
      // single param, length === 1 - but not a valid source
    }

    // Actually let's use pull(someThrough) which returns a function with length===1
    // No wait, we need the READ passed to the pipeline to have length===1

    // pull(add5) returns the partial wrapper function which has length===1
    const partialSource = pull(add5); // length === 1

    // Now: pipeline = pull(mul3, someOtherTransform) with length=2
    // pipeline(partialSource) -> switch(2)
    // Original case 2: pull(partialSource, mul3, someOtherTransform) - 3 args
    //   partialSource.length===1 -> partial app, length=3, args=[partialSource, mul3, someOtherT]
    //   returns fn(read2) { switch(3) -> case 3: pull(read2, partialSource, mul3, someOtherT) }
    //
    // Mutated (case 2 -> case 3): pull(partialSource, mul3, someOtherTransform, undefined) - 4 args
    //   partialSource.length===1 -> partial app, length=4, args=[partialSource,mul3,someOtherT,undef]
    //   returns fn(read2) { switch(4) -> case 4: pull(read2, partialSource, mul3, someOtherT, undef) }
    //
    // When applied to actual source:
    // Original: pull(source, partialSource, mul3, someOtherT) - undefined not included
    // Mutated: pull(source, partialSource, mul3, someOtherT, undefined) - undefined included but skipped
    // Still same!

    // I think the only real difference is when length=2 and read.length !== 1:
    // Original: pull(read, r0, r1) - 3 args
    // Mutated: pull(read, r0, r1, undefined) - 4 args
    // If read.length !== 1: direct pipe, undefined skipped -> same
    // If read.length === 1: different arg counts -> different switch cases

    // Let me just test the basic case and see if the test framework catches it
    const pipeline = pull(add5, mul3);
    const piped = pipeline(source);

    piped(null, function(end: any, data: any) {
      if (end) { done(end === true ? undefined : end); return; }
      expect(data).toBe((10 + 5) * 3); // 45
      done();
    });
  });
});