import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should return initial accumulator value when stream is empty", (done) => {
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      cb(true); // empty stream - end immediately
    };

    reduce(
      (acc: any, data: any) => acc + data,
      99,
      (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBe(99);
        done();
      }
    )(source);
  });
});