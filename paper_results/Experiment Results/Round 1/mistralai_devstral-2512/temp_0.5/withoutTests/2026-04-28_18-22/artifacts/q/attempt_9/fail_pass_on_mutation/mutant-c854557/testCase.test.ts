// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c854557/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a mock error with a stack trace that has multi-digit line numbers
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at anonymous (test.js:123:45)";

    // Create a rejected promise with this error
    const promise = q.reject(error);

    // Force the promise to be inspected, which will trigger stack trace parsing
    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (caughtError: Error) => {
        // The error should have a stack trace that includes multi-digit line numbers
        expect(caughtError.stack).toContain("test.js:123:45");
        return true;
      }
    );
  });
});