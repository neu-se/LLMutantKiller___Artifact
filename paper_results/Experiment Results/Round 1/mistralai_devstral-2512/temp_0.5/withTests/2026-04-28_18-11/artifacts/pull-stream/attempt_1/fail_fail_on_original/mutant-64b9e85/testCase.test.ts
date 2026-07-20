import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error to callback when stream ends with error', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const read = pull(
      function (abort, cb) {
        if (abort) {
          cb(abort);
        } else {
          cb(error);
        }
      },
      find(function (data) {
        return data === 'test';
      }, function (err, result) {
        callbackCalled = true;
        expect(err).toBe(error);
        expect(result).toBeNull();
        done();
      })
    );

    read(null, function (end, data) {
      // This should not be called since the source ends with an error immediately
      expect(callbackCalled).toBe(true);
    });
  });
});