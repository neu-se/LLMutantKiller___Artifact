import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should call callback exactly once when source ends normally", (done) => {
    let cbCallCount = 0;
    const values = [1, 2];
    let i = 0;
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    reduce(
      (acc: number, x: number) => acc + x,
      0,
      (err: any, result: number) => {
        cbCallCount++;
        expect(cbCallCount).toBe(1);
        expect(err).toBeNull();
        expect(result).toBe(3);
        setTimeout(() => {
          expect(cbCallCount).toBe(1);
          done();
        }, 50);
      }
    )(source);
  });
});