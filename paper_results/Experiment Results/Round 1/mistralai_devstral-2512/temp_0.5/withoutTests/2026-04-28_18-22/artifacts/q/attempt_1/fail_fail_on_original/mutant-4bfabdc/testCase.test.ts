import { Q } from "./q";

describe("filterStackString mutation test", () => {
  it("should correctly filter stack traces with internal and node frames", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler that will be in the stack trace
    const result = promise.catch((error) => {
      // This should be filtered out as an internal frame
      return Q.delay(0).then(() => {
        throw error;
      });
    });

    // Return the promise so Jest can wait for it
    return result.catch((error) => {
      // The error should have a stack trace that was filtered
      expect(error.stack).toBeDefined();

      // The key difference: with the mutation (|| instead of &&), more lines
      // should be filtered out incorrectly. We check that internal Q frames
      // are properly preserved in the original but might be missing in mutant.
      const stackLines = error.stack.split('\n');
      const hasQFrames = stackLines.some(line =>
        line.includes("q.js") || line.includes("filterStackString")
      );

      // In the original code, internal Q frames should be filtered out
      // In the mutated code, the logic changes and might incorrectly keep them
      expect(hasQFrames).toBe(false);
    });
  });
});