import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error to callback when stream ends with error', (done) => {
    const error = new Error('test error');
    let callbackInvoked = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    find((data: any) => false, (err: any, result: any) => {
      callbackInvoked = true;
      expect(err).toBe(error);
      expect(result).toBeNull();
      done();
    });

    pull(
      source,
      find((data: any) => false, (err: any, result: any) => {
        if (!callbackInvoked) {
          callbackInvoked = true;
          expect(err).toBe(error);
          expect(result).toBeNull();
          done();
        }
      })
    );
  });
});