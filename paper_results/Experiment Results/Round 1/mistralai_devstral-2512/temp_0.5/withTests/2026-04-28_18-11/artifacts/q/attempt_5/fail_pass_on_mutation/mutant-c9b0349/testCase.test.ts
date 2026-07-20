// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should preserve non-Q frames in stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a function that will appear in the stack trace
    function testFunction() {
      throw new Error("Test error");
    }

    // Create a promise chain that will generate stack frames
    const promise = Q().then(() => {
      testFunction();
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

        // In the original code, we should have testFunction in the stack
        // In the mutated code, all frames would be filtered out
        const hasTestFunction = lines.some(line =>
          line.includes('testFunction')
        );
        expect(hasTestFunction).toBe(true);

        // Also verify we have multiple frames
        expect(lines.length).toBeGreaterThan(2);
      }
    );
  });
});