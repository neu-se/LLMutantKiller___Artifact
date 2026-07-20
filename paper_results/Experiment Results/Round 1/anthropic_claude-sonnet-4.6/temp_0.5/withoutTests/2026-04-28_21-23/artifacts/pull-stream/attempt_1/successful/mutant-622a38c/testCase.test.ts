import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with no initial accumulator on empty stream", () => {
  it("should call callback with null error when stream ends normally with no data", (done) => {
    // Create a source that ends immediately without providing data
    const emptySource = (end: any, cb: Function) => {
      cb(true, null); // signal end immediately
    };

    const reducer = (acc: any, data: any) => {
      return data;
    };

    // Call reduce with 2 arguments (no initial accumulator)
    const sink = reduce(reducer, (err: any, result: any) => {
      // In original code: end === true, so cb(null) is called -> err should be null
      // In mutated code: false ? null : end -> cb(true) is called -> err should be true
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});