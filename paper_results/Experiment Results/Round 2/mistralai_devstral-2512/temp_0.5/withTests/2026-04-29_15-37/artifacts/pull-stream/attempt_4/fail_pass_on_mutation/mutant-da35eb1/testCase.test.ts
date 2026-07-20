const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('find error handling', () => {
  it('should pass error to callback when stream ends with true', (done) => {
    const testError = true;

    pull(
      function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) {
          cb(abort);
        } else {
          cb(testError);
        }
      },
      pull.find(function (data: any) {
        return data === 'test';
      }, function (err: any, result: any) {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});