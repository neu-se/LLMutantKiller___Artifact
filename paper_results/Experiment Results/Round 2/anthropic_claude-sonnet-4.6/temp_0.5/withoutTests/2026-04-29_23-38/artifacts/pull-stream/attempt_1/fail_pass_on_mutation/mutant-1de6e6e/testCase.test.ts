import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should correctly reduce values from a source stream and call callback with result", (done) => {
    // Create a simple pull-stream source that emits values [1, 2, 3, 4, 5]
    const values = [1, 2, 3, 4, 5];
    let index = 0;
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index >= values.length) {
        return cb(true);
      }
      cb(null, values[index++]);
    };

    const sink = reduce(
      (acc: number, data: number) => acc + data,
      0,
      (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(15); // 1+2+3+4+5 = 15
        done();
      }
    );

    sink(source);
  });
});