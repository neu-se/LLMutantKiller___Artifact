// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should properly filter Q internal frames while preserving external frames", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Check that we have a stack trace
      expect(error.stack).toBeDefined();

      const stackLines = error.stack!.split('\n');

      // The mutation changes isInternalFrame to always return true
      // This means ALL stack frames would be filtered as "internal"
      // In original code, only q.js frames within line range are filtered

      // Count Q internal frames (should be filtered in original)
      const qInternalFrames = stackLines.filter((line: string) =>
        line.includes("q.js") &&
        (line.includes("promiseDispatch") ||
         line.includes("makeStackTraceLong") ||
         line.includes("isInternalFrame") ||
         line.includes("filterStackString"))
      );

      // Count external frames (should remain in original)
      const externalFrames = stackLines.filter((line: string) =>
        !line.includes("q.js") ||
        (line.includes("at ") && !line.includes("q.js"))
      );

      // In original code: should have external frames, few/no Q internal frames
      // In mutated code: either everything filtered or nothing filtered properly
      expect(externalFrames.length).toBeGreaterThan(0);
      expect(qInternalFrames.length).toBeLessThan(2);

      // Should have reasonable total stack depth
      expect(stackLines.length).toBeGreaterThan(3);
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});