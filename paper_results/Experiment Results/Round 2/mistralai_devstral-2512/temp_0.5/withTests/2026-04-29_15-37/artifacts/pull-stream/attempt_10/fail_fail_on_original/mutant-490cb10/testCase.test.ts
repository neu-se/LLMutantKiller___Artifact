import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when stream ends with error and no done callback', (done) => {
    // Create a source that ends with an error
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(new Error('stream error'));
    };

    // Create a drain without a done callback
    const sink = drain();

    // Override console.warn to capture the error
    const originalWarn = console.warn;
    console.warn = (message: any) => {
      if (message instanceof Error && message.message === 'no done callback supplied') {
        console.warn = originalWarn;
        done();
      }
    };

    // Start the pipeline - this should trigger the error
    pull(source, sink);
  });
});