// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should filter internal stack frames when hasStacks is true", async () => {
    // This test relies on the behavior of stack trace filtering
    // The mutation changes the condition from `if (!hasStacks)` to `if (hasStacks)`
    // which would break stack trace filtering in environments that support stacks

    // Create a scenario that would normally generate stack traces
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // In the original code, when hasStacks is true, the stack filtering should work
    // In the mutated code, the condition is inverted, so stack filtering won't work
    // We can detect this by checking if the stack contains internal Q frames

    try {
      await promise;
    } catch (e) {
      // The stack should be filtered in the original code when hasStacks is true
      // In the mutated version, internal frames won't be filtered
      expect(e.stack).toBeDefined();

      // Check if the stack contains internal Q frames (which shouldn't happen in original)
      // This is a heuristic - in the original code with proper filtering, internal frames
      // should be removed. In the mutated version, they might remain.
      const hasInternalFrames = e.stack && e.stack.includes("q.js");
      expect(hasInternalFrames).toBe(false);
    }
  });
});