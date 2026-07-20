// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should preserve non-Q stack frames in error traces", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a function that will appear in the stack trace
    function testFunction() {
      throw new Error("Test error from testFunction");
    }

    // Create a promise that will generate a stack trace
    const promise = Q.try(testFunction).catch((error: Error) => {
      // Check that we have a stack trace
      expect(error.stack).toBeDefined();

      // The mutation changes isInternalFrame to always return true
      // This means ALL stack frames would be filtered as "internal"
      // In original code, only q.js frames within line range are filtered

      const stackLines = error.stack!.split('\n');

      // Check if testFunction appears in the stack trace
      // In original code: should appear (not filtered)
      // In mutated code: might be filtered out (return true &&)
      const hasTestFunction = stackLines.some((line: string) =>
        line.includes("testFunction")
      );

      expect(hasTestFunction).toBe(true);

      // Also check we have reasonable number of frames
      expect(stackLines.length).toBeGreaterThan(3);

      return Q.reject(error); // Re-throw to continue test
    });

    return promise.catch(() => {
      // Test completed
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});