const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink end condition', () => {
  it('should properly handle stream end with error after end', (done) => {
    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (callCount === 0) {
        callCount++;
        cb(null, 5); // First data
      } else if (callCount === 1) {
        callCount++;
        cb(true); // End signal
      } else if (callCount === 2) {
        callCount++;
        cb(new Error('test error')); // Error after end (should be ignored)
      }
    };

    reduce((acc: number, data: number) => acc + data, 0, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(5);
      done();
    })(source);
  });
});