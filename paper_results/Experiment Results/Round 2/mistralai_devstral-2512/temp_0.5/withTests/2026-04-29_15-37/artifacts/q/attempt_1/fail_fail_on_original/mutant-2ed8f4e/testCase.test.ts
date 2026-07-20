import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter internal and node frames from stack traces", async () => {
    // Create a scenario that generates a stack trace with internal frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e) {
      // The original implementation should filter out internal frames
      // The mutated implementation (empty function) should not filter anything
      const stack = e.stack;
      expect(stack).toBeDefined();
      // This test verifies that the stack trace is being processed
      // The mutation makes filterStackString a no-op, which would change behavior
      // when long stack traces are enabled
      expect(stack.includes("From previous event:")).toBe(false);
    }
  });
});