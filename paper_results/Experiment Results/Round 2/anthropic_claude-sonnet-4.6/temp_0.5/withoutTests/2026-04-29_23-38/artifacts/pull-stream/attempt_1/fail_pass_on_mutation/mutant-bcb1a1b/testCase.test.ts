import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should handle the case when no initial accumulator is provided (2 arguments)", (done) => {
    // Create a simple pull-stream source that emits values 1, 2, 3
    const values = [1, 2, 3];
    let index = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) {
        cb(true, null);
      } else {
        cb(null, values[index++]);
      }
    };

    // Call reduce with only 2 arguments (reducer and callback, no initial accumulator)
    // In this case, the first value should be used as the initial accumulator
    const sink = reduce(
      (acc: number, data: number) => acc + data,
      (err: any, result: number) => {
        expect(err).toBeNull();
        // First value (1) becomes acc, then 1+2=3, then 3+3=6
        expect(result).toBe(6);
        done();
      }
    );

    sink(source);
  });
});