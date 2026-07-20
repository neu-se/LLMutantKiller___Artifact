import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain error handling', () => {
  it('should throw error when end is not true and no done callback', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
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
        if (!errorThrown) {
          done(new Error('Error was not thrown'));
        }
      }, 100);
    } catch (e) {
      errorThrown = true;
      expect(e).toBe(error);
      done();
    }
  });
});