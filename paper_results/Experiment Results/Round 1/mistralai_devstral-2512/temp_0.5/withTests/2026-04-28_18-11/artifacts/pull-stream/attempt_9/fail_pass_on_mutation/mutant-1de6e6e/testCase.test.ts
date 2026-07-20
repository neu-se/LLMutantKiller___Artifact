const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink end condition', () => {
  it('should properly handle stream end with data after end signal and verify callback timing', (done) => {
    let callbackCount = 0;
    let callCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (callCount === 0) {
        callCount++;
        cb(null, 1);
      } else if (callCount === 1) {
        callCount++;
        cb(true); // End signal
      } else if (callCount === 2) {
        callCount++;
        cb(null, 2); // Data after end (should trigger callback in original)
      }
    };

    reduce((acc: number, data: number) => acc + data, 0, (err: any, result: number) => {
      callbackCount++;
      expect(err).toBeNull();
      expect(result).toBe(1);
      expect(callbackCount).toBe(1);
      done();
    })(source);
  });
});