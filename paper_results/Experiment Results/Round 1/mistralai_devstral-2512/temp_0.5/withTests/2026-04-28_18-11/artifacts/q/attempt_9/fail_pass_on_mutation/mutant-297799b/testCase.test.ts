// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter Node.js internal frames from stack traces", async () => {
    // Create a promise chain that will generate stack frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // Check if the stack trace contains any Node.js internal frames
      const stackLines = e.stack.split('\n');
      const hasNodeInternalFrames = stackLines.some((line: string) =>
        line.includes("(node.js:") || line.includes("(module.js:")
      );

      // In the original code, Node.js internal frames should be filtered out
      // In the mutated code (return true), they won't be filtered
      // This test should pass on original (no Node frames) and fail on mutated (has Node frames)
      expect(hasNodeInternalFrames).toBe(false);
    }
  });
});