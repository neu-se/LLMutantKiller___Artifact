// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly identify and filter Q internal frames", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal Q frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a function that will be in the stack trace
    function externalFunction() {
      deferred.reject(error);
    }

    externalFunction();

    return deferred.promise.catch((caughtError: Error) => {
      // Check that we have a stack trace
      expect(caughtError.stack).toBeDefined();

      const stackLines = caughtError.stack!.split('\n');

      // Check for external function in stack (should remain)
      const hasExternalFunction = stackLines.some((line: string) =>
        line.includes("externalFunction")
      );

      // Check for Q internal frames (should be filtered in original)
      const hasQInternalFrames = stackLines.some((line: string) =>
        line.includes("q.js") &&
        (line.includes("promiseDispatch") ||
         line.includes("makeStackTraceLong") ||
         line.includes("isInternalFrame"))
      );

      // In original code: externalFunction should be present, Q internals filtered
      // In mutated code: either everything filtered or nothing filtered properly
      expect(hasExternalFunction).toBe(true);
      expect(hasQInternalFrames).toBe(false);

      // Should have reasonable stack depth
      expect(stackLines.length).toBeGreaterThan(3);
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});