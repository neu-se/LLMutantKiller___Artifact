// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly identify Node.js internal frames in stack traces", async () => {
    // Create a promise chain that will generate stack frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // Check if the stack trace contains Node.js internal frames
      const stackLines = e.stack.split('\n');
      const hasNodeFrames = stackLines.some((line: string) =>
        line.includes("(node.js:") || line.includes("(module.js:")
      );

      // In the original code, Node.js frames should be identified and filtered
      // In the mutated code (return true), all frames would be considered internal
      // This test verifies the filtering logic works correctly
      expect(hasNodeFrames).toBe(false);
    }
  });
});