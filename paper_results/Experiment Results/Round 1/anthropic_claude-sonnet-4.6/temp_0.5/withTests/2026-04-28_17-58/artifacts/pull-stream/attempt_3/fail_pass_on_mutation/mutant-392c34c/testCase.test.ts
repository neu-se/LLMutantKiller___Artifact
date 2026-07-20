import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should pass null as error to callback when stream ends without finding a match", (done) => {
    // Source that yields a few values then ends normally with `true`
    const values = [10, 20, 30];
    let i = 0;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        // Normal pull-stream end: pass `true` (not an Error object)
        cb(true);
        return;
      }
      cb(null, values[i++]);
    }

    // This test function never matches, so the stream will exhaust all values
    // and end normally with err=true in the drain's end callback
    const testFn = (d: number) => d === 999;

    const sink = find(testFn, (err: any, data: any) => {
      // Original: err===true ? null : err  =>  null  (correct: no error, just not found)
      // Mutated:  err===false ? null : err =>  true  (wrong: passes true as error)
      expect(err).toBe(null);
      done();
    });

    sink(source);
  });
});