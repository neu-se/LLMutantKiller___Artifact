const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should handle stream ending with true correctly', (done) => {
    const testError = new Error('test');
    pull(
      function (abort: any, cb: any) {
        cb(true);
      },
      find(function (data: any) {
        return false;
      }, function (err: any, result: any) {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});