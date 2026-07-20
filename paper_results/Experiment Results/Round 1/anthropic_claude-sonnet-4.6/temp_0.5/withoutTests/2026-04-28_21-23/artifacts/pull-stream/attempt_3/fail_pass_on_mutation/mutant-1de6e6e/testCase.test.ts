import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should use null as initial accumulator when called with two arguments", (done) => {
    const values = [10, 20, 30];
    let index = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) return cb(true);
      cb(null, values[index++]);
    };

    // Called with 2 args: reducer and callback (no initial acc)
    const sink = reduce(
      (acc: any, data: number) => (acc === null ? data : acc + data),
      (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(60);
        done();
      }
    );

    sink(source);
  });
});