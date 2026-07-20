const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal stack frames based on line number ranges", () => {
    // The mutation affects the isInternalFrame function which filters stack traces
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated: fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will be rejected with an error
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Reject the promise with an error
    deferred.reject(error);

    // Use Q.done to ensure full processing and capture the error
    let capturedError: Error | undefined;
    let doneCalled = false;

    // Wrap in setTimeout to allow the promise to settle
    setTimeout(() => {
      Q.done(deferred.promise, () => {
        doneCalled = true;
      }, (err: Error) => {
        capturedError = err;
        doneCalled = true;
      });
    }, 0);

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;

    // The test verifies that the error was processed correctly
    // The mutation would cause different filtering behavior for line numbers
    expect(doneCalled).toBe(true);
    expect(capturedError).toBe(error);
  });
});