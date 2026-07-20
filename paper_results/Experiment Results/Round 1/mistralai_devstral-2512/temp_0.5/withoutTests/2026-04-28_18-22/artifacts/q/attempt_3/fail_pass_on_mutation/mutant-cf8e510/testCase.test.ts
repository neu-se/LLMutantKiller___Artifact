// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf8e510/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle error object with stack trace", async () => {
    // Create a rejected promise with an error object that has a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a deferred to capture the behavior
    const deferred = Q.defer();
    promise.then(
      () => { throw new Error("Should not be called"); },
      (e) => {
        // This should be called with the error
        deferred.resolve(e);
        return Q.reject(e);
      }
    );

    // Wait for the error to be processed
    const caughtError = await deferred.promise;

    // Verify the error is the same object
    expect(caughtError).toBe(error);
    expect(caughtError.message).toBe("Test error");
    expect(caughtError.stack).toBeDefined();
  });
});