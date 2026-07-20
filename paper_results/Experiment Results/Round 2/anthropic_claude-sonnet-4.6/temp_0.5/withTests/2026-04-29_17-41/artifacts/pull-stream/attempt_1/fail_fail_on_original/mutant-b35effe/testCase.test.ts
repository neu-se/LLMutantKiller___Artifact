import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find - when no item matches", () => {
  it("should call callback with null error when stream ends without finding a match", (done) => {
    // Create a simple source that emits values and then ends
    function source(abort: any, cb: (end: any, data?: any) => void) {
      const values = [1, 2, 3];
      let i = 0;
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[i++]);
    }

    // We need a stateful source
    const values = [1, 2, 3];
    let i = 0;
    const statefulSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[i++]);
    };

    const sink = find(
      (d: number) => d === 99, // never matches
      (err: any, result: any) => {
        // Original: err should be null (stream ended normally with true, converted to null)
        // Mutated: err would be true (because err !== true is false when err===true, so it returns err which is true)
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    );

    sink(statefulSource);
  });
});