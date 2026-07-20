// Test case to detect the mutation in isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly filter Node.js internal stack frames", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces with Node.js frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // The original code should filter out Node.js internal frames
    // while the mutated code (where isNodeFrame always returns false) won't
    return promise.catch((e) => {
      const stack = e.stack || "";
      // Check if Node.js internal frames are present in the stack
      // This should be false in original code (filtered out)
      // but true in mutated code (not filtered)
      const hasNodeFrames = stack.includes("(module.js:") || stack.includes("(node.js:") || stack.includes("(internal/");

      // Original code should filter these out, mutated code won't
      expect(hasNodeFrames).toBe(false);
      return Q();
    });
  });
});