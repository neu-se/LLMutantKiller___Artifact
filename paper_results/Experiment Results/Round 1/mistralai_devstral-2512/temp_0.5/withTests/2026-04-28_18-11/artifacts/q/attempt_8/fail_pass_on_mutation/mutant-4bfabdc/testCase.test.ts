import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter stack traces with both internal and node frames", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate both internal and node frames
    const promise = Q.Promise((resolve, reject) => {
      // This will create a stack trace with internal Q frames
      setTimeout(() => {
        // Create an error that will have node frames in its stack
        const error = new Error("Test error");
        reject(error);
      }, 0);
    });

    return promise
      .catch((err: Error) => {
        const stack = err.stack || "";

        // Count occurrences of internal Q frames and node frames
        const hasQFrames = stack.includes("(q.js:");
        const hasNodeFrames = stack.includes("(module.js:") || stack.includes("(node.js:");

        // The original code should filter out both internal Q frames AND node frames
        // The mutated code with OR condition will keep some frames it should filter
        // Specifically, it will keep node frames because !isInternalFrame(line) will be true
        expect(hasQFrames).toBe(false);
        expect(hasNodeFrames).toBe(false);

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});