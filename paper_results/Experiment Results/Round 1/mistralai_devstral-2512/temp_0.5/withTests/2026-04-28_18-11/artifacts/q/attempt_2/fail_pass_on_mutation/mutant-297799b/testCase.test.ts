// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter out internal Q frames from stack traces", async () => {
    // Create a scenario that generates a stack trace with internal Q frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // The stack trace should not contain internal Q frames when filtered
      const stackLines = e.stack.split('\n');
      const hasInternalFrames = stackLines.some((line: string) =>
        line.includes("(q.js:") || line.includes("(module.js:") || line.includes("(node.js:")
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code (return true), they won't be filtered
      expect(hasInternalFrames).toBe(false);
    }
  });
});