const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain without done callback', () => {
  it('should warn when no done callback is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    let warningCaptured = false;

    // Create a source that ends with an error
    const errorSource = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(error);
    };

    // Override console.warn to capture the warning
    const originalWarn = console.warn;
    console.warn = (message: any) => {
      if (message && message.message === 'no done callback supplied') {
        warningCaptured = true;
      }
      originalWarn(message);
    };

    // Create a drain without a done callback
    const sink = drain(null);

    pull(
      errorSource,
      sink
    );

    // Give some time for the stream to process
    setTimeout(() => {
      console.warn = originalWarn;
      if (!warningCaptured) {
        done.fail('Expected warning about missing done callback');
      } else {
        done();
      }
    }, 100);
  });
});