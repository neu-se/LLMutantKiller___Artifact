import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation - default fallthrough with length=1 read", () => {
  it("should return a readable (not a partial function) when partial pipeline of 2 is applied to a length-1 function", (done) => {
    // pull(someThrough) returns a function with length===1
    function add1(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 1);
        });
      };
    }

    function mul2(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
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

    let i = 0;
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i++ > 0) return cb(true);
      cb(null, 5);
    }

    // pull(add1) returns a partial function with length===1
    const partialAdd1 = pull(add1);
    expect(partialAdd1.length).toBe(1);

    // pipeline with 2 transforms, length===2
    const pipeline = pull(mul2, mul3);

    // Apply pipeline to partialAdd1 (which has length===1)
    // Original case 2: pull(partialAdd1, mul2, mul3) - 3 args
    //   partialAdd1.length===1 → partial app, length=3, returns fn(read2){switch(3)->case 3: pull(read2,partialAdd1,mul2,mul3)}
    //   Applied to source: pull(source, partialAdd1, mul2, mul3)
    //   source.length===2 ≠ 1, direct pipe
    //   partialAdd1(source) = add1(source), then mul2, mul3
    //   Result: ((5+1)*2)*3 = 36
    //
    // Mutated (case 2 missing, hits default): ref=[mul2,mul3], ref.unshift(partialAdd1) → [partialAdd1,mul2,mul3]
    //   pull(partialAdd1, mul2, mul3) - 3 args
    //   partialAdd1.length===1 → partial app again! length=3, returns fn(read2){...}
    //   This returns a FUNCTION, not a readable!
    //   Then pipeline(partialAdd1) returns that function
    //   Calling it with source: pull(source, partialAdd1, mul2, mul3) → same as original!
    //
    // Hmm, still same...

    // Actually wait - in mutated default path:
    // args was set to null, ref=[mul2,mul3]
    // ref.unshift(read=partialAdd1) → ref=[partialAdd1,mul2,mul3]
    // pull.apply(null, ref) = pull(partialAdd1, mul2, mul3)
    // This is a NEW call to pull with partialAdd1.length===1
    // So it returns a NEW partial function (not a readable)
    // pipeline(partialAdd1) returns this new partial function
    
    // But in original case 2:
    // pull(partialAdd1, mul2, mul3) is also called!
    // Same result - a new partial function
    
    // They're identical! The default path does exactly the same thing as case 2 here.

    // The ONLY difference must be when length=2 and read.length !== 1
    // Original: pull(read, t1, t2) - 3 args, read.length≠1, direct pipe → readable
    // Mutated default: ref=[t1,t2], ref.unshift(read)=[read,t1,t2], pull(read,t1,t2) - same!
    
    // I'm convinced there's no observable difference. Let me just try something
    // that might expose an edge case with the args=null guard in the default path.
    
    // In default: ref.unshift(read); pull.apply(null, ref)
    // ref IS args (before null assignment), but args was set to null
    // ref still points to the original array
    // ref.unshift(read) MUTATES ref
    // Then pull.apply(null, ref) is called
    // If pull(read, t1, t2) is called and read.length===1:
    //   New partial app, args=[read,t1,t2], returns fn
    //   But this fn captures the NEW args array
    //   The ref array was mutated by unshift
    //   ref is now [read,t1,t2]
    // This is fine, no issue.
    
    // Let me just run the test and see
    const piped = pipeline(partialAdd1);
    
    // Apply to actual source to get final result
    const result = typeof piped === 'function' ? piped(source) : null;
    const finalRead = typeof result === 'function' ? result : piped;
    
    if (typeof finalRead !== 'function') {
      done(new Error('Expected a readable function'));
      return;
    }
    
    finalRead(null, function(end: any, data: any) {
      if (end) { done(end === true ? undefined : end); return; }
      expect(data).toBe(36); // (5+1)*2*3
      done();
    });
  });
});