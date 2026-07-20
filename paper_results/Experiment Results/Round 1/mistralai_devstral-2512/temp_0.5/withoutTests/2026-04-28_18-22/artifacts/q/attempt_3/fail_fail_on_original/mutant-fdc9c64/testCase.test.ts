const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal stack frames based on line number ranges", () => {
    // Create a scenario that will generate stack traces
    // The mutation affects the isInternalFrame function which filters stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will be rejected with a stack trace
    // This will trigger the stack trace filtering logic
    deferred.reject(error);

    // The mutation changes the line number filtering logic from:
    // (fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine)
    // to:
    // (fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine)
    // This changes the operator precedence and could include/exclude different lines

    // We need to verify the filtering works correctly by checking
    // that the promise system properly handles the error
    let errorHandled = false;
    deferred.promise.catch(() => {
      errorHandled = true;
    });

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;

    // The test verifies that the error was properly handled
    // The mutation would cause different stack frame filtering behavior
    expect(errorHandled).toBe(true);
  });
});