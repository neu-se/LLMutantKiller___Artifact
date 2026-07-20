// Test to detect the mutation in the isNodeFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isNodeFrame mutation detection", () => {
  it("should correctly filter stack frames in long stack traces", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a chain of promises that will generate a long stack trace
    let promise = Q.reject(new Error("Original error"));

    // Add several layers to create a deeper stack
    for (let i = 0; i < 5; i++) {
      promise = promise.catch((error: Error) => {
        throw new Error(`Wrapped error ${i}: ${error.message}`);
      });
    }

    return promise.catch((error: Error) => {
      // In the original code, internal Q frames should be filtered out
      // In the mutated code (returning true), all frames would be considered Node frames
      // This would result in different stack trace content

      const stack = error.stack || "";
      expect(stack).toBeTruthy();

      // The mutation would cause the stack trace to include more frames
      // than it should, making it longer than expected
      const stackLines = stack.split('\n').length;
      expect(stackLines).toBeLessThan(50); // Original should filter many frames

      return "handled";
    });
  });
});