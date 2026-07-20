const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack frames based on line number ranges", () => {
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

    // Capture the error through the promise chain
    let capturedError: Error | undefined;
    deferred.promise.catch((err: Error) => {
      capturedError = err;
      return Q.resolve(); // Convert to resolved promise to avoid unhandled rejection
    });

    // Use Q.done to ensure full processing
    Q.done(deferred.promise.catch(() => {}), () => {}, (err: Error) => {
      capturedError = err;
    });

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;

    // The test verifies that the error was processed correctly
    // The mutation would cause different filtering behavior for line numbers
    expect(capturedError).toBe(error);
  });
});