import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should complete with accumulated value after processing all items", (done) => {
    const items = [2, 3, 4];
    let idx = 0;
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (idx >= items.length) return cb(true);
      cb(null, items[idx++]);
    };
    reduce(
      (acc: number, val: number) => acc * val,
      1,
      (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(24);
        done();
      }
    )(source);
  });
});