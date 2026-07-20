// Test case to detect the mutation in isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should correctly identify Node.js stack frames in error handling", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    let capturedStack: string | undefined;

    const promise = Q.reject(new Error("Test error")).catch((error) => {
      capturedStack = error.stack;
      throw error;
    });

    return promise.then(
      () => {},
      () => {
        // The original code should filter Node.js frames, while the mutated code won't
        // We test this by checking if Node.js frames are present in the stack
        const hasNodeFrames = capturedStack?.includes("(module.js:") ||
                             capturedStack?.includes("(node.js:") ||
                             capturedStack?.includes("(internal/");

        // Original code should filter these out (false), mutated code won't (true)
        expect(hasNodeFrames).toBe(false);
      }
    );
  });
});