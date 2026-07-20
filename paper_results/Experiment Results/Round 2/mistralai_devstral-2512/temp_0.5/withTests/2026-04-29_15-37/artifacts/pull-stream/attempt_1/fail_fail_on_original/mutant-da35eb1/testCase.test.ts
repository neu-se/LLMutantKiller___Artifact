import * as pull from '../';

describe('find error handling', () => {
  it('should pass error to callback when stream ends with error', (done) => {
    const testError = new Error('test error');
    let callbackCalled = false;

    const read = pull(
      function (abort, cb) {
        if (abort) {
          cb(abort);
        } else {
          cb(testError);
        }
      },
      pull.find(function (data) {
        return data === 'test';
      }, function (err, result) {
        callbackCalled = true;
        expect(err).toBe(testError);
        expect(result).toBeNull();
        done();
      })
    );

    read(null, function (end, data) {
      if (!callbackCalled) {
        expect(end).toBe(testError);
      }
    });
  });
});