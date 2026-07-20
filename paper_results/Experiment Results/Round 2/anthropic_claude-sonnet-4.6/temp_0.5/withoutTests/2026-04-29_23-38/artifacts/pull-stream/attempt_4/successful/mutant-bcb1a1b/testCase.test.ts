import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should return the single emitted value unchanged when called with 2 arguments and source emits one value", (done) => {
    const values = [42];
    let index = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) {
        cb(true, null);
      } else {
        cb(null, values[index++]);
      }
    };

    // With 2 args and original code: first (only) value becomes acc,
    // then sink(source) is called, source immediately ends, cb(null, acc) => cb(null, 42)
    // With mutation: acc=null, reducer(null, 42) = null+42 = 42... same result
    // Need a reducer where null initial matters differently
    const sink = reduce(
      (acc: number, data: number) => (acc === null ? -999 : acc + data),
      (err: any, result: number) => {
        expect(err).toBeNull();
        // Original: first value 42 becomes acc, source ends, result = 42
        // Mutated: acc=null, reducer(null, 42) = -999
        expect(result).toBe(42);
        done();
      }
    );

    sink(source);
  });
});