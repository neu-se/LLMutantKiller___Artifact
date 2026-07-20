const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe("reduce sink", () => {
  it("should handle immediate end with true value correctly", (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const source = (abort: unknown, cb: (end: unknown, data?: number) => void) => {
      // Simulate immediate end with true
      cb(true);
    };

    reduce(reducer, (err: unknown, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBeUndefined();
      done();
    })(source);
  });
});