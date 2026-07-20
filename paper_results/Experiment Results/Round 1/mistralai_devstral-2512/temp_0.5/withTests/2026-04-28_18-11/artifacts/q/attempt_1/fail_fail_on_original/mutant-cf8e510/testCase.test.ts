// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf8e510/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle error object with stack property in long stack traces", async () => {
    // This test targets the mutation in makeStackTraceLong where the condition
    // was changed from AND to OR, which would incorrectly process errors
    // that don't have proper stack traces
    Q.longStackSupport = true;

    const error = new Error("test error");
    error.stack = "Error: test error\n    at Test.<anonymous> (test.js:10:5)";

    const promise = Q.reject(error);

    // Force the promise to go through the rejection path that uses makeStackTraceLong
    try {
      await promise.then(
        () => {},
        (err) => {
          // In the original code, this should properly handle the error with stack
          // In the mutated code, the condition might incorrectly process this
          throw err;
        }
      );
      throw new Error("Should not reach here");
    } catch (e) {
      // The error should maintain its stack trace
      expect(e.stack).toContain("test error");
      expect(e.stack).toContain("test.js:10:5");
    }
  });
});