// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should not filter out all stack frames when checking for Node.js internals", async () => {
    // Create a promise chain that will generate stack frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // Check if the stack trace contains any frames at all
      const stackLines = e.stack.split('\n').filter(line => line.trim() !== '');

      // In the original code, some frames should remain after filtering
      // In the mutated code (return true), all frames would be filtered out
      expect(stackLines.length).toBeGreaterThan(1);
    }
  });
});