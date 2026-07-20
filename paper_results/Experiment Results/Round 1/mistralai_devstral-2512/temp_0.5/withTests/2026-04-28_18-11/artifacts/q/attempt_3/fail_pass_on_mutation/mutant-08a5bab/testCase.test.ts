// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly identify internal Q stack frames", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    return promise
      .catch((error: Error) => {
        // Check that the stack trace exists
        expect(error.stack).toBeDefined();

        // The mutation changes the isInternalFrame function to always return true
        // This means ALL stack frames would be filtered out as "internal"
        // In the original code, only frames from q.js within the line range should be filtered

        // We'll check if any Q internal frames remain in the stack
        // In the original code, they should be filtered out
        // In the mutated code, they might still appear or the stack might be empty
        const stackLines = error.stack!.split('\n');
        const hasQInternalFrames = stackLines.some(line =>
          line.includes("q.js") &&
          (line.includes("isInternalFrame") ||
           line.includes("filterStackString") ||
           line.includes("makeStackTraceLong"))
        );

        // In the original code, these internal frames should be filtered out
        // In the mutated code, they might remain or the stack might be malformed
        expect(hasQInternalFrames).toBe(false);

        // Also check that we still have some stack frames (not everything filtered)
        const hasAnyFrames = stackLines.length > 1; // More than just error message
        expect(hasAnyFrames).toBe(true);
      })
      .finally(() => {
        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      });
  });
});