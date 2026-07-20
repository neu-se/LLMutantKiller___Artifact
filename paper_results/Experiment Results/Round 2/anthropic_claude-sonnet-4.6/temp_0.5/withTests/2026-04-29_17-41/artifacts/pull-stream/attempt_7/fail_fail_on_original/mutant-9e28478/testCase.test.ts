import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull case 2 mutation detection", () => {
  it("partial sink composed with another partial sink should work correctly", (done) => {
    // The key insight: when a partial sink (length===1) is passed as the 
    // source to another partial sink, the behavior differs between original and mutated.
    //
    // Original case 2: pull(partialSink, f1, f2)
    //   partialSink.length===1 -> creates NEW partial with length=3, args=[partialSink,f1,f2]
    //   switch(3): case 3: return pull(src, partialSink, f1, f2)
    //
    // Mutated falls to case 3: pull(partialSink, f1, f2, undefined)  
    //   partialSink.length===1 -> creates NEW partial with length=4, args=[partialSink,f1,f2,undefined]
    //   switch(4): case 4: return pull(src, partialSink, f1, f2, ref[3])
    //   ref[3] = undefined -> pull(src, partialSink, f1, f2, undefined)
    //   -> processes partialSink(src), f1, f2, undefined(skip) -> same result
    //
    // These are still equivalent...
    //
    // OK let me try a COMPLETELY different approach.
    // What if I test that the partial sink throws when called twice?
    // The throw check happens before the switch. So that's not affected.
    //
    // What if I check the NUMBER of times a through function is called?
    // In both cases, f1 and f2 are each called once. Same.
    //
    // I'm going to look at this from a pure "what can undefined do differently" angle.
    // The ONLY way undefined as extra arg matters is if something iterates arguments
    // or checks arguments.length. In pull's loop, it uses `length` variable (= arguments.length).
    // pull(x, a, b): length=3, loop i=1,2 -> processes a, b
    // pull(x, a, b, undefined): length=4, loop i=1,2,3 -> processes a, b, undefined(skip)
    // 
    // What if `b` is a duplex object stream and its `.source` has length===1?
    // Then after processing b: read = b.source (length===1)
    // Then i=3: s=undefined -> skipped
    // Returns b.source. Same as without undefined.
    //
    // I truly believe this mutation is equivalent. But since the task insists
    // there's a detectable difference, let me try testing the return value
    // of the partial sink call directly - maybe it returns `undefined` in some edge case.

    // What if we DON'T pass a source to the partial sink?
    // The partial sink expects to be called with a read function.
    // In mutated code, case 2 falls to case 3.
    // If somehow the switch falls through WITHOUT executing case 3's return...
    // No, that can't happen - case 3 has a return statement.

    // FINAL IDEA: What if length===2 but the switch in the mutated code
    // evaluates case 2 with no statement, then case 3's return,
    // but due to some JS quirk the return value is undefined?
    // No - return pull(...) always returns what pull returns.

    // Let me just try to verify that the partial sink returns the correct
    // read function (not undefined) and that it processes data correctly.
    // Maybe I've been wrong about the fall-through behavior.

    // Actually - could it be that `case 2:` with nothing (not even a semicolon)
    // causes a syntax issue or the case is treated differently?
    // In JS: switch(2) { case 2: case 3: return x } -> returns x. Fall-through works.

    // I'll try testing with pull.values and pull.collect which are higher-level:
    const collected: number[] = [];
    
    // Use pull's own utilities to create a pipeline with exactly 2 throughs
    // as a partial sink, then connect to a source
    const mapDouble = pull.map((x: number) => x * 2);
    const mapAddTen = pull.map((x: number) => x + 10);
    
    // This creates a partial sink with length===2
    const pipeline = pull(mapDouble, mapAddTen);
    
    expect(typeof pipeline).toBe("function");
    expect(pipeline.length).toBe(1);
    
    // Connect source to partial sink and collect
    pull(
      pull.values([1, 2, 3]),
      pipeline,
      pull.collect((err: any, results: number[]) => {
        expect(err).toBeFalsy();
        expect(results).toEqual([12, 14, 16]);
        done();
      })
    );
  });
});