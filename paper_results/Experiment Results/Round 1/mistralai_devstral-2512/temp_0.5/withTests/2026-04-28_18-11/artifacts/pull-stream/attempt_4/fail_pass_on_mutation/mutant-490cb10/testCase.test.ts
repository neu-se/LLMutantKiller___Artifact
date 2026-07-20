const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain without done callback', () => {
  it('should throw error when no done callback is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    // Create a source that ends with an error
    const errorSource = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(error);
    };

    // Create a drain without a done callback
    const sink = drain(null);

    // Override console.warn to prevent the warning from being logged
    const originalWarn = console.warn;
    console.warn = () => {};

    try {
      pull(
        errorSource,
        sink
      );
    } catch (e) {
      errorThrown = true;
    }

    // Restore console.warn
    console.warn = originalWarn;

    setTimeout(() => {
      if (!errorThrown) {
        done.fail('Expected error to be thrown when no done callback is provided');
      } else {
        done();
      }
    }, 100);
  });
});