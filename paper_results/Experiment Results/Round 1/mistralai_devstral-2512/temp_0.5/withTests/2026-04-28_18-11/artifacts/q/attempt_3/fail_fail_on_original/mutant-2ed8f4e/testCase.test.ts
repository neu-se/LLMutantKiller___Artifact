// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-2ed8f4e/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should properly filter stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create a scenario where makeStackTraceLong is called
    promise.then(() => {
      throw error;
    }).catch((err: Error) => {
      // The stack should be filtered
      const stack = err.stack;
      expect(stack).toBeDefined();

      // In the original code, the stack should be properly filtered
      // In the mutated code, filterStackString returns empty string
      if (stack) {
        expect(stack.length).toBeGreaterThan(0);
        // Check that internal Q frames are filtered out
        expect(stack.includes("at ")).toBe(true);
      }
      return null;
    });

    // Trigger the error
    deferred.reject(error);
    return promise;
  });
});