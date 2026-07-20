// Test case to detect the mutation in isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly identify Node.js stack frames in error handling", () => {
    // Create a scenario that forces stack trace filtering
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // The original code should filter Node.js frames, while the mutated code won't
    return promise.catch((e) => {
      const stack = e.stack || "";
      // Check for specific Node.js internal frames that should be filtered
      const hasNodeFrames = stack.includes("(module.js:") ||
                           stack.includes("(node.js:") ||
                           stack.includes("(internal/");

      // Original code should filter these out (false), mutated code won't (true)
      expect(hasNodeFrames).toBe(false);
    });
  });
});