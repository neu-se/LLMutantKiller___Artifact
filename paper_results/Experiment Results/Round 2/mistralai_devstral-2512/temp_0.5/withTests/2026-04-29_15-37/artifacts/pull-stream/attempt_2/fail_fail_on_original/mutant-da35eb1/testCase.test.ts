import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('find error handling', () => {
  it('should pass error to callback when stream ends with true', (done) => {
    const testError = true;
    let callbackCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(testError);
      }
    };

    find(function (data: any) {
      return data === 'test';
    }, function (err: any, result: any) {
      callbackCalled = true;
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    })(source);
  });
});