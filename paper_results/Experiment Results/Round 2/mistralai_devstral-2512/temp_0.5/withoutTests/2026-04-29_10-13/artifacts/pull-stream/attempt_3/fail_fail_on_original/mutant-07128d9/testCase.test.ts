import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when end is truthy but not true and no done callback', () => {
    const error = new Error('test error');
    let capturedError: Error | null = null;

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
        capturedError = msg;
      }
    };

    // Create a drain without a done callback
    const sink = drain(null);

    // Pipe the mock source to the drain
    sink(mockSource);

    // Restore console.warn
    console.warn = originalWarn;

    // The error should have been thrown
    expect(capturedError).not.toBeNull();
    expect(capturedError?.message).toBe('no done callback supplied');
  });
});