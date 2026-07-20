import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should work correctly when no initial accumulator is provided", (done) => {
    const values = [1, 2, 3];
    let i = 0;
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    reduce((acc: any, x: number) => (acc === null ? x : acc + x), (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(6);
      done();
    })(source);
  });
});