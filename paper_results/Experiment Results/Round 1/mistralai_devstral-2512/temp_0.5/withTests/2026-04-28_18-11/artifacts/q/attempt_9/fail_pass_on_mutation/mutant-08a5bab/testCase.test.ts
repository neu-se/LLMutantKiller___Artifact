// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should not filter all stack frames as internal", () => {
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

      // Count frames that look like actual stack frames (contain "at ")
      const actualFrames = stackLines.filter((line: string) =>
        line.includes("at ")
      );

      // In original code: should have multiple actual frames
      // In mutated code: might have very few or none if everything filtered
      expect(actualFrames.length).toBeGreaterThan(2);

      // Check that we have frames from this test file (should not be filtered)
      const hasTestFileFrames = stackLines.some((line: string) =>
        line.includes("testCase.test.ts")
      );

      // In original code: test file frames should remain
      // In mutated code: might be filtered out
      expect(hasTestFileFrames).toBe(true);
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});