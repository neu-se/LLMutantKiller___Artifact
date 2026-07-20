import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should correctly accumulate values and return final result", (done) => {
    const results: number[] = [];
    let index = 0;
    const values = [1, 2, 3, 4, 5];

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) return cb(true);
      cb(null, values[index++]);
    };

    reduce(
      (acc: number, val: number) => acc + val,
      0,
      (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(15);
        done();
      }
    )(source);
  });
});