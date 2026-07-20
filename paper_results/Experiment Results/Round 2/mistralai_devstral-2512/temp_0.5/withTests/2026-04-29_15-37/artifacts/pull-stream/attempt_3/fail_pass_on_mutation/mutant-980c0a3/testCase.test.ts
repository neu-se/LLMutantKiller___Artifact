import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error handling', () => {
  it('should throw when end is not true and no done callback', (done) => {
    const error = new Error('test error');

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, undefined);

    try {
      pull(source, sink);
      setTimeout(() => {
        done(new Error('Expected error to be thrown'));
      }, 100);
    } catch (err) {
      expect(err).toBe(error);
      done();
    }
  });
});