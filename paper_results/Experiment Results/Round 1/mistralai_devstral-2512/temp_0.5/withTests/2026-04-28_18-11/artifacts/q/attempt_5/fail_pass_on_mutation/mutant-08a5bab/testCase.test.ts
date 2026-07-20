// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter Q internal stack frames", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace with Q internal frames
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Check that we have a stack trace
      expect(error.stack).toBeDefined();

      // The mutation changes isInternalFrame to always return true
      // This means ALL stack frames would be filtered as "internal"
      // In original code, only q.js frames within line range are filtered

      // Count total stack frames
      const stackLines = error.stack!.split('\n');
      const totalFrames = stackLines.length;

      // In original code: should have multiple frames including test file
      // In mutated code: either empty stack or only error message
      expect(totalFrames).toBeGreaterThan(2);

      // Check if we have our test file in the stack
      const hasTestFile = stackLines.some((line: string) =>
        line.includes("testCase.test.ts")
      );
      expect(hasTestFile).toBe(true);
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});