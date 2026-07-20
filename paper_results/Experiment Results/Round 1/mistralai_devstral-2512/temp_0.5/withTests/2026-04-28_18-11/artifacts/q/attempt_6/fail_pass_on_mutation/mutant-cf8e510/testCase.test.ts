// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_6/pending_category/mutant-cf8e510/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle error object with stack property in long stack traces", () => {
    // Create a promise chain that will trigger makeStackTraceLong
    const deferred = Q.defer();
    const error = new Error("test error");
    error.stack = "Error: test error\n    at Test.<anonymous> (test.js:10:5)";

    // Set up a promise chain that will reject with our error
    deferred.reject(error);

    return deferred.promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (err: Error) => {
          // The error should have its stack trace preserved
          expect(err.stack).toContain("test error");
          expect(err.stack).toContain("test.js:10:5");
          // Return a new promise to continue the chain
          return Q.resolve(err);
        }
      )
      .then((err: Error) => {
        // Additional check to ensure stack trace is maintained
        expect(err.stack).toContain("test error");
      });
  });
});