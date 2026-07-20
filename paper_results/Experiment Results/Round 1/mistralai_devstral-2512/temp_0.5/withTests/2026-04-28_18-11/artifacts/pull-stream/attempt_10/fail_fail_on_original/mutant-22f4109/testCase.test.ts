const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain error creation', () => {
  it('should create error object when done is null', () => {
    // Create a mock console.warn to capture the warning
    const originalWarn = console.warn;
    let warningCaptured = null;

    console.warn = (msg) => {
      warningCaptured = msg;
    };

    // Create a drain sink without done callback
    const sink = drain(null);

    // Try to trigger the stream end behavior
    const mockRead = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // End the stream
      }
    };

    sink(mockRead);

    // Restore console.warn
    console.warn = originalWarn;

    // In the original code, this should have triggered the warning
    // In the mutated code, it won't because the error wasn't created
    expect(warningCaptured).toBeInstanceOf(Error);
    expect(warningCaptured.message).toBe('no done callback supplied');
  });
});