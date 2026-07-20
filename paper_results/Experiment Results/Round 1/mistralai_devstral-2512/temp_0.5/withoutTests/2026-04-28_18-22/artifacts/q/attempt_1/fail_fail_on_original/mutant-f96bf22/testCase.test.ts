import { Q } from "./q";

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    try {
      await promise;
    } catch (error) {
      // The stack trace should not contain internal Q frames when filtered
      const stack = error.stack;
      // Check that the stack trace doesn't contain Q's internal implementation details
      // This test assumes that the original code filters internal frames properly
      // while the mutated code (with "if (true)") would not filter them
      expect(stack).not.toContain("filterStackString");
      expect(stack).not.toContain("makeStackTraceLong");
    }
  });
});