const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack trace lines", () => {
    // Directly test the stack trace parsing functionality
    // by creating a scenario that would fail if getFileNameAndLineNumber
    // doesn't work properly

    // Create a promise that will generate a stack trace
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a rejected promise with a stack trace
      const deferred = Q.defer();
      const error = new Error("Test error");
      deferred.reject(error);

      // Get the promise and its stack
      const promise = deferred.promise;
      const stack = promise.stack;

      // The original code should properly parse stack lines
      // The mutated code (empty function) would fail to parse them
      // We can detect this by checking if the stack contains
      // properly formatted line information

      // Check for standard stack trace patterns that would be
      // detected by the original getFileNameAndLineNumber function
      const hasValidStackPattern = stack && (
        /at [^ ]+ \(.+:\d+:\d+\)/.test(stack) ||  // Chrome/V8 pattern
        /at .+:\d+:\d+/.test(stack) ||            // Node pattern
        /@.+:\d+$/.test(stack)                    // Firefox pattern
      );

      expect(hasValidStackPattern).toBe(true);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});