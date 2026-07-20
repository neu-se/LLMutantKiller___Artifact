import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error handling', () => {
  it('should handle non-true end values without throwing when done callback exists', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;
    let errorThrown = false;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, (err: any) => {
      callbackCalled = true;
      expect(err).toBe(error);
    });

    try {
      pull(source, sink);
      setTimeout(() => {
        if (!callbackCalled) {
          done(new Error('Callback was not called'));
        } else if (errorThrown) {
          done(new Error('Error was thrown when it should have been handled by callback'));
        } else {
          done();
        }
      }, 100);
    } catch (err) {
      errorThrown = true;
      done(new Error('Error was thrown when it should have been handled by callback'));
    }
  });
});