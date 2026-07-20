// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-cf8e510/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle error object with stack property in long stack traces", () => {
    // Create a promise that will reject with an error that has a stack
    const error = new Error("test error");
    error.stack = "Error: test error\n    at Test.<anonymous> (test.js:10:5)";

    // Create a promise chain that will trigger makeStackTraceLong
    const promise = Q.reject(error);

    // Force long stack traces to be enabled
    (Q as any).longStackSupport = true;

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (err: Error) => {
          // The error should have its stack trace preserved
          expect(err.stack).toContain("test error");
          expect(err.stack).toContain("test.js:10:5");
          return err;
        }
      )
      .then((err: Error) => {
        // Additional check to ensure stack trace is maintained
        expect(err.stack).toContain("test error");
      });
  });
});