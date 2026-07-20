import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should reduce values from a source stream and call callback with accumulated result", (done) => {
    // Create a simple pull-stream source that emits numbers 1, 2, 3
    const values = [1, 2, 3];
    let index = 0;
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) {
        return cb(true); // end of stream
      }
      cb(null, values[index++]);
    };

    const sink = reduce(
      (acc: number, data: number) => acc + data,
      0,
      (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(6); // 0 + 1 + 2 + 3
        done();
      }
    );

    sink(source);
  });
});