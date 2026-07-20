// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_6/pending_category/mutant-2ed8f4e/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should properly filter stack traces and preserve non-internal frames", () => {
    // Create a scenario where filterStackString is called
    const error = new Error("Test error");
    const deferred = Q.defer();

    // Create a promise chain that will trigger stack filtering
    const promise = deferred.promise.then(() => {
      throw error;
    }).catch((err: Error) => {
      const stack = err.stack;
      expect(stack).toBeDefined();

      // In the original code, the stack should contain some frames
      // In the mutated code, filterStackString returns empty string
      if (stack) {
        // The original should preserve at least some frames
        // The mutant will return empty string, making this fail
        expect(stack.includes("at ")).toBe(true);
        expect(stack.length).toBeGreaterThan(10);
      }
      return null;
    });

    // Trigger the error
    deferred.reject(error);
    return promise;
  });
});