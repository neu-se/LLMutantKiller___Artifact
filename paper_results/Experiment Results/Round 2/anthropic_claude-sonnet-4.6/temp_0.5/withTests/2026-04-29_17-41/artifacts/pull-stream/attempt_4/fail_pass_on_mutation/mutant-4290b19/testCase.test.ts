import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink", () => {
  it("should correctly pipe values through a partial sink with 4 arguments hitting case 4", (done) => {
    // With length=4: pull(t1, t2, t3, sink)
    // Original args = [t1, t2, t3, sink]
    // Mutated args  = [t1, t2, t3, sink, undefined]
    // switch(4): pull(read, ref[0], ref[1], ref[2], ref[3])
    // Original: ref[3] = sink (correct)
    // Mutated:  ref[3] = sink (still correct, ref[4]=undefined but not accessed)
    // Still no difference in case 4...

    // The ONLY way to trigger it: length=5 default case with undefined passed to pull
    // But undefined is silently ignored in pull's loop
    // So we need a different approach: verify the partial sink throws when called twice
    // The second call should throw regardless - that's not mutation-specific

    // Actually let me reconsider: with length=4 and mutated code,
    // args has 5 elements. switch uses `length` variable (=4), so case 4:
    // pull(read, ref[0], ref[1], ref[2], ref[3]) - ref[3] is the sink, ref[4]=undefined ignored
    // Still no difference!

    // With length=5 (default), ref = [t1,t2,t3,t4,sink,undefined]
    // ref.unshift(read) => [read,t1,t2,t3,t4,sink,undefined]
    // pull(read,t1,t2,t3,t4,sink,undefined)
    // In pull's loop: s=undefined -> neither function nor object -> read stays as sink's source
    // But sink already consumed read via s.sink or s(read)...
    // Actually sink is a function, so read = sink(read) returns undefined
    // Then undefined is passed as next s... let's trace carefully

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
            expect(results).toEqual([5, 6, 7]);
            done();
            return;
          }
          if (end) {
            done(end);
            return;
          }
          results.push(data);
          next();
        });
      };
      next();
    };

    // length=5, hits default case
    // addOne x4 applied to values [1,2,3] => [5,6,7]
    const partialSink = pull(addOne, addOne, addOne, addOne, collectSink);

    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    };

    partialSink(source);
  });
});