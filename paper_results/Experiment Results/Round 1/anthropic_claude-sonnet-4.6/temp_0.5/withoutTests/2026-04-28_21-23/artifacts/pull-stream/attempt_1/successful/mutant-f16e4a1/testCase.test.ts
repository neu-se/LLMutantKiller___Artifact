import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with 2 arguments (no initial accumulator)", () => {
  it("should call callback with null error when stream ends normally with no data", (done) => {
    // Create a source that ends immediately (empty stream)
    const emptySource = (end: any, cb: Function) => {
      cb(true, null); // Signal end immediately
    };

    const reducer = (acc: any, data: any) => {
      return (acc || 0) + data;
    };

    const sink = reduce(reducer, (err: any, result: any) => {
      // Original code: end === true ? null : end => cb(null)
      // Mutated code: end === false ? null : end => cb(true) since end=true, end===false is false
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});