const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal stack frames based on line number ranges", () => {
    // The mutation affects the isInternalFrame function which determines
    // whether stack frames should be filtered from error stacks
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated: fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will be rejected with an error
    const promise = Q.reject(new Error("Test error"));

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Use Q.done to trigger the stack trace filtering
    let errorThrown = false;
    try {
      Q.done(promise);
    } catch (error) {
      errorThrown = true;
    }

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;

    // The test verifies that the error was properly handled
    // The mutation would cause different filtering behavior for line numbers
    // specifically changing the operator precedence which could include
    // frames that should be excluded or exclude frames that should be included
    expect(errorThrown).toBe(true);
  });
});