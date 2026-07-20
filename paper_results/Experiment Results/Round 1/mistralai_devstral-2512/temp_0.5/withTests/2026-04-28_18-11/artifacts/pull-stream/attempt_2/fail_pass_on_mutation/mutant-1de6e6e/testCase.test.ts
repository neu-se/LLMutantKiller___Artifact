const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink end condition', () => {
  it('should properly handle stream end with true value', (done) => {
    let endCalled = false;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (!endCalled) {
        endCalled = true;
        cb(true); // End with true
      }
    };

    reduce((acc: number, data: number) => acc + data, 0, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(0);
      done();
    })(source);
  });
});