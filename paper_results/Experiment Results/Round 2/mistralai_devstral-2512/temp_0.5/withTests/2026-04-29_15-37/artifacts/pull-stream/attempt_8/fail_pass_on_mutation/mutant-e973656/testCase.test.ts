import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain mutation test', () => {
  it('should handle non-true end values correctly', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, (end: any) => {
      callbackCalled = true;
      expect(end).toBe(error);
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