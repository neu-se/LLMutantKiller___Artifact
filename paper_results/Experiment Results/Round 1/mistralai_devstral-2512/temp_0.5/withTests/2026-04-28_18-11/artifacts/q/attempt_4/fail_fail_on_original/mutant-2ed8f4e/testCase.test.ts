// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_4/pending_category/mutant-2ed8f4e/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter stack traces correctly", () => {
    // Create a test that directly tests the filterStackString function
    // by creating a scenario where it's called
    const testStack = `Error: Test error
    at Test.test (test.js:10:20)
    at internalFrame (q.js:100:10)
    at nodeFrame (module.js:50:5)
    at anotherFrame (test.js:20:30)`;

    // Create a deferred that will reject with an error
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Manually set the stack to our test stack
    error.stack = testStack;

    // Create a promise chain that will trigger stack filtering
    const promise = deferred.promise.then(() => {
      throw error;
    }).catch((err: Error) => {
      // In the original code, internal and node frames should be filtered
      // In the mutated code, the stack will be empty
      const filteredStack = err.stack;
      expect(filteredStack).toBeDefined();

      // The original should filter out internal frames
      // The mutant will return empty string
      if (filteredStack) {
        expect(filteredStack.includes("Test.test")).toBe(true);
        expect(filteredStack.includes("internalFrame")).toBe(false);
        expect(filteredStack.includes("nodeFrame")).toBe(false);
      }
      return null;
    });

    // Trigger the rejection
    deferred.reject(error);
    return promise;
  });
});