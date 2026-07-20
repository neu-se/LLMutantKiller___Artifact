import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter stack traces with internal frames", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Create a test error with a stack trace that includes internal Q frames
    const testError = new Error("Test error");
    testError.stack = [
      "Error: Test error",
      "    at userCode (test.js:10:15)",
      "    at internalQFunction (q.js:100:20)",  // Internal Q frame
      "    at anotherInternal (q.js:200:30)",    // Internal Q frame
      "    at finalUserFrame (test.js:30:40)"
    ].join("\n");

    // Create a promise that will use the stack trace filtering
    const deferred = Q.defer();
    deferred.reject(testError);

    // Enable long stack traces
    Q.longStackSupport = true;

    return deferred.promise
      .catch((err: Error) => {
        const stack = err.stack || "";

        // The original code should filter out internal Q frames (q.js lines)
        // The mutated code with OR condition will keep internal frames
        // because !isNodeFrame(line) will be true for internal Q frames
        expect(stack).not.toContain("(q.js:");

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});