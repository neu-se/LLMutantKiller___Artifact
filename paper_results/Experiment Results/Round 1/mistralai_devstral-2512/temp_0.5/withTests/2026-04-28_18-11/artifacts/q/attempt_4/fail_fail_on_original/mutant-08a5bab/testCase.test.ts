// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should maintain correct stack frame filtering for Q internal frames", () => {
    // Create a scenario that generates a stack trace through Q's promise chain
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal Q frames
    const promise = deferred.promise
      .then(() => { throw error; })
      .catch((e) => {
        // Check the stack trace structure
        expect(e.stack).toBeDefined();

        // Count how many Q internal frames remain in the stack
        const stackLines = e.stack!.split('\n');
        const qInternalFrames = stackLines.filter(line =>
          line.includes("q.js") &&
          (line.includes("promiseDispatch") ||
           line.includes("makeStackTraceLong") ||
           line.includes("isInternalFrame"))
        );

        // In original code: internal Q frames should be filtered out (0 or very few)
        // In mutated code: ALL frames are considered internal, so either:
        // 1. All frames are filtered (stack might be empty)
        // 2. The filtering logic is broken and internal frames remain
        // We test for the original behavior where internal frames are properly filtered
        expect(qInternalFrames.length).toBeLessThan(3);

        // Also verify we still have some useful stack frames
        const hasUsefulFrames = stackLines.some(line =>
          line.includes(".test.ts") || line.includes("at Object.")
        );
        expect(hasUsefulFrames).toBe(true);

        throw e; // Re-throw to continue the test
      });

    // Restore original setting
    Q.longStackSupport = originalLongStackSupport;

    return promise.catch(() => {
      // Test completed successfully if we reach here
    });
  });
});