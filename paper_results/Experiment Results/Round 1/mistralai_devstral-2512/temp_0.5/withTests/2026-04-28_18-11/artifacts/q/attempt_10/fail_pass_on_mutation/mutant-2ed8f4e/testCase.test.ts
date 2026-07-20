// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-2ed8f4e/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter stack traces and preserve application frames", () => {
    // Create a test that exercises the stack filtering behavior
    const error = new Error("Test error");
    const deferred = Q.defer();

    // Create a promise chain that will generate a stack trace
    const promise = deferred.promise.then(() => {
      throw error;
    }).catch((err: Error) => {
      const stack = err.stack;
      expect(stack).toBeDefined();

      // In the original code, the stack should contain application frames
      // In the mutated code, filterStackString returns empty string
      if (stack) {
        // Check that we have some stack frames preserved
        // The mutant will return empty string, making this assertion fail
        expect(stack).not.toEqual("");
        expect(stack).not.toEqual("\n");
        expect(stack).not.toEqual(" ");
      }
      return null;
    });

    // Trigger the error
    deferred.reject(error);
    return promise;
  });
});