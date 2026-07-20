const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass error to callback when stream ends with error', (done) => {
    const error = new Error('test error');

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    pull(
      source,
      find((data: any) => false, (err: any, result: any) => {
        expect(err).toBe(error);
        expect(result).toBeNull();
        done();
      })
    );
  });
});