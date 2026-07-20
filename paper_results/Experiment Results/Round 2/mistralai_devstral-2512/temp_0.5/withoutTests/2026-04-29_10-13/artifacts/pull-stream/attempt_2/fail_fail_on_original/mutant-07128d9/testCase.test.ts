import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle error end without done callback', (done) => {
    const error = new Error('test error');
    let errorThrown = false;

    // Create a mock source that immediately calls the callback with an error
    const mockSource = (abort: any, cb: (err?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // Simulate async error
      setImmediate(() => {
        cb(error);
      });
    };

    // Create a drain without a done callback
    const sink = drain(null);

    // Override console.warn to capture the warning
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      if (msg instanceof Error && msg.message === 'no done callback supplied') {
        errorThrown = true;
      }
      originalWarn(msg);
    };

    // Pipe the mock source to the drain
    sink(mockSource);

    // Check that the error was thrown and warning was issued
    setTimeout(() => {
      console.warn = originalWarn;
      expect(errorThrown).toBe(true);
      done();
    }, 10);
  });
});