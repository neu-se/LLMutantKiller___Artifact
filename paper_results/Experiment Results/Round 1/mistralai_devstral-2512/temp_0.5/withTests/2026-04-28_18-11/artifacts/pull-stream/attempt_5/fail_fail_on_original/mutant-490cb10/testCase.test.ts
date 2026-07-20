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

    // Override console.warn to capture the warning
    const originalWarn = console.warn;
    console.warn = (message: any) => {
      if (message && message.message === 'no done callback supplied') {
        errorThrown = true;
      }
      // Don't call originalWarn to prevent the warning from being logged
    };

    pull(
      errorSource,
      sink
    );

    // Restore console.warn
    console.warn = originalWarn;

    setTimeout(() => {
      if (!errorThrown) {
        done.fail('Expected warning about missing done callback');
      } else {
        done();
      }
    }, 100);
  });
});