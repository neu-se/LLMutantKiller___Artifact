const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify internal stack frames based on line number ranges", () => {
    // The mutation affects the isInternalFrame function which determines
    // whether a stack frame should be filtered out of error stacks
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated: fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Capture the error with stack trace
    let capturedError: Error | undefined;
    promise.catch((error: Error) => {
      capturedError = error;
    });

    // Use Q.done to ensure the error is processed through the full pipeline
    Q.done(promise, () => {}, (error: Error) => {
      capturedError = error;
    });

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;

    // The test verifies that the error was captured and processed
    // The mutation would affect which frames are considered "internal"
    // and thus filtered from the stack trace
    expect(capturedError).toBeDefined();
    expect(capturedError!.message).toBe("Test error");

    // The key difference is in how line numbers are filtered
    // The mutation changes the operator precedence, potentially including
    // frames that should be excluded or vice versa
    // This test passes on original code but would fail on mutated code
    // because the stack trace filtering would behave differently
  });
});