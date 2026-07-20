import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with 2 arguments - stream ends immediately", () => {
  it("should call callback with null error when stream ends immediately with no data", (done) => {
    // Create a source that ends immediately without emitting any data
    const emptySource = (end: any, cb: Function) => {
      cb(true, null); // signal end immediately
    };

    const reducer = (acc: any, data: any) => {
      return acc + data;
    };

    const sink = reduce(reducer, (err: any, result: any) => {
      // Original: end === true => cb(null), so err should be null
      // Mutated: false ? null : end => cb(true), so err would be true
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});