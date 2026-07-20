import { Q } from "./q";

describe("Q promise error stack handling", () => {
  it("should correctly build long stack traces with multiple promise rejections", async () => {
    // Create a chain of promises that will be rejected
    const error = new Error("Test error");
    const promise1 = Q.reject(error);
    const promise2 = promise1.then(() => { throw new Error("Intermediate error"); });
    const promise3 = promise2.then(() => { throw new Error("Final error"); });

    try {
      await promise3;
      fail("Promise should have been rejected");
    } catch (e) {
      // The mutation breaks the stack trace building logic
      // In the original code, the stack should contain multiple promise traces
      // In the mutated code, the condition will always be false after first check
      expect(e.stack).toBeDefined();
      // The mutated version will have a different stack trace structure
      // because it won't properly concatenate all promise stacks
      const stackLines = e.stack.split('\n');
      expect(stackLines.length).toBeGreaterThan(1);
      // Check that we have the stack jump separator indicating multiple promise stacks
      expect(e.stack).toContain("From previous event:");
    }
  });
});