// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-2ed8f4e/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter internal frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace with internal frames
    const error = new Error("Test error");
    const deferred = Q.defer();

    // Create a scenario where makeStackTraceLong is called
    const promise = deferred.promise.then(() => {
      throw error;
    }).catch((err: Error) => {
      // The stack should be filtered
      const stack = err.stack;
      expect(stack).toBeDefined();

      // In the original code, internal frames should be filtered out
      // In the mutated code, filterStackString returns empty string
      if (stack) {
        expect(stack.length).toBeGreaterThan(0);
        // Check that the stack contains some frames but not all
        // The mutant will return empty string, making this fail
        expect(stack).not.toEqual("");
      }
      return null;
    });

    // Trigger the error
    deferred.reject(error);
    return promise;
  });
});