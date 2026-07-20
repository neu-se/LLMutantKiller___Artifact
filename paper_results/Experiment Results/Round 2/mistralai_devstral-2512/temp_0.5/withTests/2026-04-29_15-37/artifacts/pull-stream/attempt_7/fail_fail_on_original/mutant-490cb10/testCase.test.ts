import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when stream ends without a done callback', (done) => {
    // Create a source that emits one value and then ends
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 1);
      cb(true);
    };

    // Create a drain without a done callback
    const sink = drain();

    // Override console.error to capture the error
    const originalError = console.error;
    let errorCaptured = false;
    console.error = (message: any) => {
      if (message instanceof Error && message.message === 'no done callback supplied') {
        errorCaptured = true;
        console.error = originalError;
      }
    };

    // Start the pipeline
    pull(source, sink);

    // Check after a short delay to allow the stream to process
    setTimeout(() => {
      if (errorCaptured) {
        done();
      } else {
        done(new Error('Expected error was not thrown'));
      }
    }, 100);
  });
});