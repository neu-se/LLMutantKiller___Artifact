const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink', () => {
  it('should process data and end stream correctly', (done) => {
    const reducer = (acc: number | null, data: number) => (acc || 0) + data;
    let callCount = 0;
    const source = (abort: any, cb: (end: boolean | Error, data?: number) => void) => {
      if (callCount === 0) {
        cb(false, 1);
      } else if (callCount === 1) {
        cb(false, 2);
      } else if (callCount === 2) {
        cb(true); // End the stream
      }
      callCount++;
    };

    reduce(reducer, 0, (err: Error | null, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(3); // 1 + 2
      done();
    })(source);
  });
});