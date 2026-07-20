// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should preserve non-Q stack frames when filtering internal frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a function that will appear in the stack trace
    function externalFunction() {
      throw new Error("Test error from external function");
    }

    // Create a promise chain that will generate stack frames
    const promise = Q().then(() => {
      externalFunction();
    });

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        const stack = error.stack;
        expect(stack).toBeDefined();

        // The mutation changes the condition from checking line numbers to always true
        // This means in the mutated version, ALL frames would be filtered out
        // In the original version, only Q internal frames should be filtered
        const lines = stack.split('\n').filter(line => line.trim() !== '');

        // In the original code, we should have externalFunction in the stack
        // In the mutated code, all frames would be filtered out
        const hasExternalFunction = lines.some(line =>
          line.includes('externalFunction')
        );
        expect(hasExternalFunction).toBe(true);

        // Also verify we have multiple frames
        expect(lines.length).toBeGreaterThan(2);

        // Check that we have actual stack frames (not just the error message)
        const hasStackFrames = lines.some(line =>
          line.includes('.js:') || line.includes('at ')
        );
        expect(hasStackFrames).toBe(true);
      }
    );
  });
});