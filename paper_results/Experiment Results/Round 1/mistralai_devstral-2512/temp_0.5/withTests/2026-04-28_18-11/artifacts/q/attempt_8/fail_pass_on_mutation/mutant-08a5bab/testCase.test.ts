// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should maintain proper stack trace structure", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Check that we have a stack trace
      expect(error.stack).toBeDefined();

      const stackLines = error.stack!.split('\n');

      // The mutation changes isInternalFrame to always return true
      // This means ALL stack frames would be filtered as "internal"
      // In original code, only q.js frames within line range are filtered

      // Check that we have at least some stack frames beyond just the error message
      expect(stackLines.length).toBeGreaterThan(1);

      // Check that we have at least one frame that contains "at " (standard stack frame)
      const hasStandardFrames = stackLines.some((line: string) =>
        line.includes("at ")
      );

      // In original code: should have standard frames
      // In mutated code: might filter everything out
      expect(hasStandardFrames).toBe(true);

      // Check that the stack isn't just the error message
      expect(stackLines[0]).toContain("Error: Test error");
      expect(stackLines.length).toBeGreaterThan(1);
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});