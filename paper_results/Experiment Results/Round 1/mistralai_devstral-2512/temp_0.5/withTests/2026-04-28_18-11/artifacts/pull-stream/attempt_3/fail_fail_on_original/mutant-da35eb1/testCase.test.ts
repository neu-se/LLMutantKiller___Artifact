const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass error when stream ends with error', (done) => {
    const error = new Error('test error');
    pull(
      pull.values([1, 2, 3]),
      pull.asyncMap((data: any, cb: any) => {
        if (data === 2) {
          cb(error);
        } else {
          cb(null, data);
        }
      }),
      find(null, (err: any, result: any) => {
        expect(err).toBe(error);
        expect(result).toBeNull();
        done();
      })
    );
  });
});