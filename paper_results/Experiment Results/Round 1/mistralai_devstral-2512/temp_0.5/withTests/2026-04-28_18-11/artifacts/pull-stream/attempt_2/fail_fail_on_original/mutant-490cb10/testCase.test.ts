const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain without done callback', () => {
  it('should throw an error when no done callback is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    // Create a source that ends with an error
    const errorSource = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    // Create a drain without a done callback
    const sink = drain(null);

    // Capture console.warn to check if the error message is logged
    const originalWarn = console.warn;
    console.warn = (message) => {
      if (message instanceof Error && message.message === 'no done callback supplied') {
        errorThrown = true;
      }
      originalWarn(message);
    };

    pull(
      errorSource,
      sink
    );

    // Give some time for the stream to process
    setTimeout(() => {
      console.warn = originalWarn;
      if (!errorThrown) {
        done.fail('Expected error to be thrown when no done callback is provided');
      } else {
        done();
      }
    }, 100);
  });
});