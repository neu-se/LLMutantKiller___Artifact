// Test case to detect the mutation in isNodeFrame function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly identify Node.js stack frames in error handling", async () => {
    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force a rejection that will go through the stack trace filtering
    deferred.reject(error);

    // Wait for the promise to be rejected and check the stack trace
    try {
      await deferred.promise;
    } catch (e) {
      const stack = e.stack || "";
      // The original code should filter out Node.js frames, while the mutated code won't
      // This test verifies that Node.js frames are being filtered
      expect(stack.includes("(module.js:") || stack.includes("(node.js:")).toBe(false);
    }
  });
});