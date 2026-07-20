// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-297799b/testCase.test.ts
import { Q } from "./q.js";

describe("Q library stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a scenario where Q generates a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e) {
      // In the original code, internal Q frames should be filtered out
      // In the mutated code, all frames would be considered "internal" (return true)
      // so the stack trace would be empty or minimal
      const stack = e.stack;
      expect(stack).toBeDefined();
      expect(stack.length).toBeGreaterThan(0);
      // The stack should contain more than just the error message line
      expect(stack.split('\n').length).toBeGreaterThan(1);
    }
  });
});