// Test case to detect the mutation in isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly filter Node.js stack frames from error traces", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces with Node.js frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // The original code should filter Node.js frames, while the mutated code won't
    return promise.catch((e) => {
      const stack = e.stack || "";
      // Check for Node.js internal frames that should be filtered
      const hasNodeFrames = stack.includes("(module.js:") ||
                           stack.includes("(node.js:") ||
                           stack.includes("(timers.js:") ||
                           stack.includes("(internal/");

      // Original code should filter these out (false), mutated code won't (true)
      expect(hasNodeFrames).toBe(false);
    });
  });
});