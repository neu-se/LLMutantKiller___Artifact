import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with 2 arguments on empty stream", () => {
  it("should call callback with null error when stream ends immediately with no data", (done) => {
    // Create an empty source that ends immediately
    const emptySource = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined); // stream ended immediately
    };

    const reducer = (acc: any, data: any) => acc + data;

    // Call reduce with 2 arguments (no initial accumulator)
    const sink = reduce(reducer, (err: any, result: any) => {
      // Original: err should be null (end === true ? null : end => null)
      // Mutated: err should be true (end === false ? null : end => true)
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});