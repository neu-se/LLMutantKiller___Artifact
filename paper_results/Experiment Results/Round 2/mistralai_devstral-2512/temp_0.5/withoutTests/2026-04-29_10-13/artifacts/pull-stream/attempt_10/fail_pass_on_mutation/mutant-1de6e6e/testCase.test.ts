const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should handle end signal with false value correctly', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(false, 1); // false end signal with data
      cb(true); // End stream
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(1);
      done();
    })(source);
  });
});