const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('find error handling', () => {
  it('should distinguish between true and other errors when stream ends', (done) => {
    const testError = new Error('test error');

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
        expect(err).toBe(testError);
        expect(result).toBeNull();
        done();
      })
    );
  });
});