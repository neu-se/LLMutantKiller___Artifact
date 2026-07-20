import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should handle non-true end values correctly', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const source = function (abort, cb) {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, (err) => {
      callbackCalled = true;
      expect(err).toBe(error);
      done();
    });

    pull(source, sink);

    setTimeout(() => {
      if (!callbackCalled) {
        done(new Error('Callback was not called'));
      }
    }, 100);
  });
});