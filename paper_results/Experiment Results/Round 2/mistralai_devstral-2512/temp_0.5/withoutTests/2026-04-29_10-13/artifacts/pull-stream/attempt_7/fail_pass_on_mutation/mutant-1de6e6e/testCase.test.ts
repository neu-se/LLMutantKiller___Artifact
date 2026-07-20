const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should process multiple data chunks and end correctly', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (callCount === 0) {
        cb(null, 1);
      } else if (callCount === 1) {
        cb(null, 2);
      } else if (callCount === 2) {
        cb(null, 3);
      } else {
        cb(true); // End stream
      }
      callCount++;
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(6); // 1 + 2 + 3
      done();
    })(source);
  });
});