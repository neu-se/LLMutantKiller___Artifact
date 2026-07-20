import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should pass null as first argument to callback when stream ends normally without a match", (done) => {
    // A source that emits [1, 2, 3] then ends with true
    const values = [1, 2, 3];
    let index = 0;

    function source(end: any, cb: Function) {
      if (end) {
        return cb(end);
      }
      if (index < values.length) {
        cb(null, values[index++]);
      } else {
        cb(true); // normal end of stream
      }
    }

    // find with a predicate that never matches - stream ends normally
    const sink = find(
      (data: number) => data === 999, // never matches
      (err: any, data: any) => {
        // Original: err === true becomes null, so err should be null
        // Mutated: false ? null : err always returns err (which is true), so err would be true
        expect(err).toBeNull();
        done();
      }
    );

    // The sink is a function that takes a source - drive it
    sink(source);
  });
});