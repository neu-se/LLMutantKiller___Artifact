// Test case to detect the mutation in the isNodeFrame function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter out Node.js internal frames from stack traces", async () => {
    // Create a scenario that generates a stack trace with Node.js internal frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Simulate a rejection that would include Node.js frames in the stack
    Q.nextTick(() => {
      deferred.reject(error);
    });

    try {
      await deferred.promise;
    } catch (e) {
      // The stack should not contain Node.js internal frames when filtered
      const stackLines = e.stack.split('\n');
      const hasNodeFrames = stackLines.some(line =>
        line.includes("(node.js:") || line.includes("at Module.")
      );

      // In the original code, Node.js frames should be filtered out
      // In the mutated code, they won't be filtered (always returns false)
      expect(hasNodeFrames).toBe(false);
    }
  });
});