import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should use first emitted value as initial accumulator when no initial value provided", (done) => {
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

    // Called with 2 arguments: reducer concatenates arrays
    // Original: first value [1] becomes acc, then concat [2], then concat [3] => [1,2,3]
    // Mutated: acc starts as null, null.concat([1]) throws or produces wrong result
    const sink = reduce(
      (acc: number[], data: number) => acc.concat([data]),
      (err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual([1, 2, 3]);
        done();
      }
    );

    sink(source);
  });
});