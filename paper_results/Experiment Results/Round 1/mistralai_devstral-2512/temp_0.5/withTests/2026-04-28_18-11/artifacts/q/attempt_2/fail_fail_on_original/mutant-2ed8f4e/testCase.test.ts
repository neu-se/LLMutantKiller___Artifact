// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-2ed8f4e/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter internal and node frames from stack traces", () => {
    // Create a scenario that generates a stack trace with internal frames
    Q.longStackSupport = true;
    const error = new Error("Test error");

    // Create a promise chain that will generate stack frames
    const promise = Q.reject(error);

    // Force long stack trace generation
    return promise.then(() => {
      throw error;
    }).catch((err: Error) => {
      // The stack should be filtered, removing internal Q frames
      const stack = err.stack;
      expect(stack).toBeDefined();

      // In the original code, internal frames should be filtered out
      // In the mutated code, the stack will be empty due to the empty filter function
      if (stack) {
        expect(stack.length).toBeGreaterThan(0);
        // Check that the stack doesn't contain Q internal frames
        expect(stack).not.toContain("q.js");
      }
      return null;
    });
  });
});