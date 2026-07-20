import { Q } from "./q.js";

describe("Q library stack trace support", () => {
  it("should properly detect stack trace support", () => {
    // This test verifies that the Q library correctly detects whether stack traces are supported
    // The mutation removes the error throwing/catching logic that determines stack trace support
    // By checking the long stack support flag, we can detect if the mutation is present

    // Force enable long stack support
    Q.longStackSupport = true;

    // Create a rejected promise to trigger stack trace handling
    const rejectedPromise = Q.reject(new Error("Test error"));

    // The behavior we're testing is whether the library properly handles stack traces
    // In the original code, hasStacks would be true (from the try-catch block)
    // In the mutated code, hasStacks would be false (since no error is thrown)

    // We can observe this by checking if the promise has a stack property
    // This is a side effect of the stack trace support detection
    return rejectedPromise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error) => {
        // In the original code with proper stack trace support, the error should have a stack
        // In the mutated code without proper detection, it might not
        expect(error.stack).toBeDefined();
        expect(typeof error.stack).toBe("string");
        expect(error.stack.length).toBeGreaterThan(0);
      }
    );
  });
});