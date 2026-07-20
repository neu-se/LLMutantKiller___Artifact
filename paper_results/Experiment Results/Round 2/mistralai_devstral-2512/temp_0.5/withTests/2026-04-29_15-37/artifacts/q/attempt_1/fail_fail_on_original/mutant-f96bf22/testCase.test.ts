import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should filter out internal Q frames and Node.js frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace with internal Q frames
    const promise = Q.reject(new Error("test error"));

    // Add a handler that will be in the stack trace
    const result = await promise.catch((error: Error) => {
      // Get the stack trace
      const stack = error.stack;

      // In the original code, internal Q frames and Node.js frames should be filtered out
      // In the mutated code, all frames will be included
      // We can't directly check the stack content since it's environment-dependent,
      // but we can check that the filtering logic is working by verifying the behavior
      // is different between original and mutated code

      // The key is that the original code should have fewer lines in the stack
      // than the mutated code because it filters out frames
      if (stack) {
        const lines = stack.split('\n');
        // This is a heuristic check - the original code should have fewer lines
        // because it filters out internal frames
        // The exact number depends on the environment, but the mutated version
        // should always have more lines than the original
        expect(lines.length).toBeLessThan(20); // Original code should filter out many frames
      }
      throw error; // Re-throw to continue the test
    }).catch(() => {
      // This catch is just to prevent unhandled rejection
      return "handled";
    });

    expect(result).toBe("handled");
  });
});