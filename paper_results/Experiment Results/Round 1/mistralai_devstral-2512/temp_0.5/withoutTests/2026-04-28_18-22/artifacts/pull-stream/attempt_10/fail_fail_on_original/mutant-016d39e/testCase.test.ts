import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error with descriptive message when no done callback and stream errors', () => {
    const testError = new Error('stream error');
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // Simulate an error in the stream
        cb(testError);
      }
    };

    const sink = drain(null, undefined);

    // Capture console.warn output
    const originalWarn = console.warn;
    const warnMessages: any[] = [];
    console.warn = (msg: any) => warnMessages.push(msg);

    try {
      // This should trigger the error path in drain
      source(null, (end: any, data: any) => {
        if (end) {
          sink.abort(end);
        }
      });
    } catch (e) {
      // Expected to throw the stream error
    } finally {
      console.warn = originalWarn;
    }

    // Check that the warning was called with the correct error message
    expect(warnMessages.length).toBeGreaterThan(0);
    expect(warnMessages[0].message).toBe('no done callback supplied');
  });
});