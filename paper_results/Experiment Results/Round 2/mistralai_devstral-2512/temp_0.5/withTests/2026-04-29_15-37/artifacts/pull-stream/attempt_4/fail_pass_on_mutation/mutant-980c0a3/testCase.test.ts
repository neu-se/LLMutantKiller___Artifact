import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error handling', () => {
  it('should handle non-true end values without done callback', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    // Mock console.warn to track warnings
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      if (msg instanceof Error && msg.message === 'no done callback supplied') {
        errorThrown = true;
      }
      originalWarn(msg);
    };

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
        console.warn = originalWarn;
        if (!errorThrown) {
          done(new Error('Expected warning about missing done callback'));
        } else {
          done();
        }
      }, 100);
    } catch (err) {
      console.warn = originalWarn;
      expect(err).toBe(error);
      done();
    }
  });
});