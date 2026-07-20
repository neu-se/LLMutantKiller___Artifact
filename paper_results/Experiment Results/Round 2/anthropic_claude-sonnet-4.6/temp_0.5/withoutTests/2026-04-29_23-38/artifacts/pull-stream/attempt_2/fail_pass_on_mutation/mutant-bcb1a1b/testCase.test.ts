import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should use the first emitted value as initial accumulator when called with 2 arguments", (done) => {
    const values = [10, 2, 3];
    let index = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) {
        cb(true, null);
      } else {
        cb(null, values[index++]);
      }
    };

    // Called with 2 arguments: reducer and callback (no initial accumulator)
    // Original: first value (10) becomes acc, then 10+2=12, then 12+3=15
    // Mutated: acc starts as null, so null+10=10 (NaN or "null10"), result differs
    const sink = reduce(
      (acc: number, data: number) => acc + data,
      (err: any, result: number) => {
        expect(err).toBeNull();
        // With original code: first value (10) is used as initial acc, result = 10+2+3 = 15
        expect(result).toBe(15);
        done();
      }
    );

    sink(source);
  });
});