// Test case to detect the mutation in isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly identify and filter Node.js stack frames", () => {
    // Create a scenario that forces stack trace filtering
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // This will trigger the stack trace filtering logic
    deferred.promise.then(() => {
      throw error;
    }).catch(() => {});

    deferred.reject(error);

    // The original code should filter Node.js frames, while the mutated code won't
    // We verify this by checking the error's stack property
    return Q.delay(10).then(() => {
      const stack = error.stack || "";
      // This assertion will fail in the mutated version where isNodeFrame always returns false
      // because Node.js frames won't be filtered from the stack trace
      expect(stack.includes("(module.js:") || stack.includes("(node.js:")).toBe(false);
    });
  });
});