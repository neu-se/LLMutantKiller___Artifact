// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-bb4d5fb/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly identify internal stack frames", () => {
    // Enable long stack traces to test the filtering behavior
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const error = new Error("Test error");
    const deferred = Q.defer();
    deferred.reject(error);

    const promise = deferred.promise;

    // Force stack trace generation
    promise.then(() => {}, (err: any) => {
      // Check that internal frames are properly filtered
      if (err.stack) {
        // The original code should filter out internal Q frames
        // The mutated code (return true &&) would not filter them
        const hasInternalFrames = err.stack.includes("q.js");
        expect(hasInternalFrames).toBe(false);
      }
    });

    // Return the promise to wait for completion
    return promise.catch(() => {});
  });
});