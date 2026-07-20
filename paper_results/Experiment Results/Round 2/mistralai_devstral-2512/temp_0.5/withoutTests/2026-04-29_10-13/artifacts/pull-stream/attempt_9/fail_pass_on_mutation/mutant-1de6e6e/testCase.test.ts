const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should process data when end is false and continue processing', (done) => {
    const reducer = (acc: number | null, data: number): number => {
      return acc === null ? data : acc + data;
    };

    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (callCount === 0) {
        cb(false, 1); // false end signal
      } else if (callCount === 1) {
        cb(null, 2);
      } else {
        cb(true); // End stream
      }
      callCount++;
    };

    reduce(reducer, null, (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(3); // 1 + 2
      done();
    })(source);
  });
});