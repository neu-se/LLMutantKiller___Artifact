import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when stream ends with non-true error and no done callback', (done) => {
    const testError = new Error('test error');
    let errorThrown = false;

    const source = (abort: any, cb: (end: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // Simulate stream ending with error (not true)
        cb(testError);
      }
    };

    // Create drain without done callback
    const sink = drain(null);

    // Override console.warn to track the warning
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      if (msg instanceof Error && msg.message === 'no done callback supplied') {
        errorThrown = true;
      }
      originalWarn(msg);
    };

    // Start the stream
    sink(source);

    // Check after a short delay
    setTimeout(() => {
      expect(errorThrown).toBe(true);
      console.warn = originalWarn;
      done();
    }, 10);
  });
});