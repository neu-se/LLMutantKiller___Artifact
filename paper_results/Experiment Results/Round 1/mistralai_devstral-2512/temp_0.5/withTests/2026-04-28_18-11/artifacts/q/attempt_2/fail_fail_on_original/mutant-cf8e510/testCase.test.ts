// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf8e510/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle error object with stack property in long stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will trigger makeStackTraceLong
    const deferred = Q.defer();
    const error = new Error("test error");
    error.stack = "Error: test error\n    at Test.<anonymous> (test.js:10:5)";

    // Set up a promise chain that will reject with our error
    return deferred.promise
      .then(() => {
        throw error;
      })
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (err: Error) => {
          // In the original code, the error should have its stack trace preserved
          // In the mutated code, the condition might incorrectly process this error
          expect(err.stack).toContain("test error");
          expect(err.stack).toContain("test.js:10:5");
        }
      )
      .finally(() => {
        // Clean up
        Q.longStackSupport = false;
      });
  });
});