import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle error end without done callback', () => {
    const error = new Error('test error');
    let warningIssued = false;
    let errorThrown = false;

    // Create a mock source that calls the callback with an error
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

    // Override console.warn to capture the warning
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      if (msg instanceof Error && msg.message === 'no done callback supplied') {
        warningIssued = true;
      }
      originalWarn(msg);
    };

    // Create a drain without a done callback
    const sink = drain(null);

    try {
      // Pipe the mock source to the drain
      sink(mockSource);
    } catch (e) {
      errorThrown = true;
    } finally {
      // Restore console.warn
      console.warn = originalWarn;
    }

    // The warning should have been issued and error thrown
    expect(warningIssued).toBe(true);
    expect(errorThrown).toBe(true);
  });
});