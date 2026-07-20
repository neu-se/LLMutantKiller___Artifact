const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce sink end condition', () => {
  it('should properly handle stream end with error value', (done) => {
    const testError = new Error('test error');
    let endCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (!endCalled) {
        endCalled = true;
        cb(testError); // End with error
      }
    };

    reduce((acc: number, data: number) => acc + data, 0, (err: any, result: number) => {
      expect(err).toBe(testError);
      expect(result).toBe(0);
      done();
    })(source);
  });
});