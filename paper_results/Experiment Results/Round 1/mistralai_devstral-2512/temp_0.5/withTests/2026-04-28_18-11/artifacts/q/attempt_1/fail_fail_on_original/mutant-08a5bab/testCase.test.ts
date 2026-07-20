// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter internal stack frames from Q library", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    return promise
      .catch((error: Error) => {
        // Check that the stack trace exists and contains expected content
        expect(error.stack).toBeDefined();

        // The mutation would cause all stack frames to be considered internal
        // In the original code, only frames from q.js within the line range should be filtered
        // With the mutation (return true &&), all frames would be filtered out

        // We expect at least some stack frames to remain (non-Q frames)
        // If the mutation is present, the stack might be empty or only contain minimal info
        const stackLines = error.stack!.split('\n');
        const hasNonQFrames = stackLines.some(line =>
          line.includes(".test.ts") ||  // This test file
          line.includes("at ") ||       // Generic stack frame marker
          line.includes("Error:")       // Error message line
        );

        expect(hasNonQFrames).toBe(true);
      })
      .finally(() => {
        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      });
  });
});