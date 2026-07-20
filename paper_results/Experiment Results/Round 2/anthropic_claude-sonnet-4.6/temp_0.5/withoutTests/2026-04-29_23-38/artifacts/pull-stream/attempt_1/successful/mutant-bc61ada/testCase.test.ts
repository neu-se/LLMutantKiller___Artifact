import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with 2 arguments - immediate end behavior", () => {
  it("should call callback with null error when source ends immediately with no data (normal end)", (done) => {
    // Create a source that ends immediately (empty source)
    const emptySource = (end: any, cb: Function) => {
      cb(true, null); // Signal immediate end
    };

    const reducer = (acc: any, data: any) => acc + data;

    // Call reduce with 2 arguments (reducer + callback), no initial accumulator
    const sink = reduce(reducer, (err: any, result: any) => {
      // Original: end === true => cb(null), so err should be null
      // Mutated: end !== true => cb(end) when end is true, so err would be true
      expect(err).toBeNull();
      done();
    });

    // sink is a function that takes a source
    sink(emptySource);
  });
});