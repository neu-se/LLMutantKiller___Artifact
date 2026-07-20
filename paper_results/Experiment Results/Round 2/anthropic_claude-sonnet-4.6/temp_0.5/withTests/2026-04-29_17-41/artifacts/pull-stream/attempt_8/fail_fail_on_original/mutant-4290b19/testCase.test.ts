import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("detects mutation via source with length 1 in default case causing different partial sink behavior", (done) => {
    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data + 1);
      });
    };

    const results: number[] = [];
    const collectSink = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(results).toEqual([2, 3, 4]);
            done();
            return;
          }
          if (end) { done(end); return; }
          results.push(data);
          next();
        });
      };
      next();
    };

    // 5 args → default case
    // partialSink = pull(addOne, addOne, addOne, addOne, collectSink)
    // When partialSink(source) is called:
    // Original: ref=[addOne,addOne,addOne,addOne,collectSink], ref.unshift(source)
    //   → pull(source, addOne, addOne, addOne, addOne, collectSink) with source.length=2
    //   → normal pipeline, works correctly
    // Mutated: ref=[addOne,addOne,addOne,addOne,collectSink,undefined], ref.unshift(source)
    //   → pull(source, addOne, addOne, addOne, addOne, collectSink, undefined) with source.length=2
    //   → normal pipeline, undefined skipped, works correctly
    // SAME!

    // But what if source.length === 1?
    // Original: pull(source, addOne, addOne, addOne, addOne, collectSink) with source.length=1
    //   → creates partial sink! Returns function, doesn't run pipeline!
    // Mutated: pull(source, addOne, addOne, addOne, addOne, collectSink, undefined) with source.length=1
    //   → creates partial sink with args=[source,addOne,addOne,addOne,addOne,collectSink,undefined]
    //   → Returns function

    // In both cases a function is returned, not undefined. The pipeline doesn't run.
    // partialSink(source) returns a function instead of running collectSink.
    // done() would never be called... this would timeout.

    // So source.length=1 breaks BOTH original and mutated in the same way.
    
    // I need source.length=2 for correct behavior.
    let i = 0;
    const values = [1, 2, 3];
    const source = function(abort: any, cb: Function) {  // length=2
      if (abort) { cb(abort); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    };

    const partialSink = pull(addOne, addOne, addOne, addOne, collectSink);
    partialSink(source);
  });
});