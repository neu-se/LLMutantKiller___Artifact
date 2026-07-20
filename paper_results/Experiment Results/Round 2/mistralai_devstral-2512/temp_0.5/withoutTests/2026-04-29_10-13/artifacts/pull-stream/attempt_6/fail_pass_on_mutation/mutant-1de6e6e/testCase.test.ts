const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle end signal with true value correctly', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(null, 10);
      cb(true); // End with true
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(10);
      done();
    })(source);
  });
});