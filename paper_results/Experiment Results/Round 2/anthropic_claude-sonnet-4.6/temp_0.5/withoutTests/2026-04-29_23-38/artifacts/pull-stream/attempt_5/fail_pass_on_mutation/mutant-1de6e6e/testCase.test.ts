import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("detects mutation by verifying reduce handles end signal correctly through drain", (done) => {
    const results: number[] = [];
    const values = [1, 2, 3];
    let i = 0;
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    reduce(
      (acc: number[], x: number) => { acc.push(x); return acc; },
      results,
      (err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual([1, 2, 3]);
        done();
      }
    )(source);
  });
});