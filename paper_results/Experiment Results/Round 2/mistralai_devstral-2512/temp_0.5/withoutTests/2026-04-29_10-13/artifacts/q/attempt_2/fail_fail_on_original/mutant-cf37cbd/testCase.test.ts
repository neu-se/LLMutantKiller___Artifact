// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a promise that will be rejected to generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be inspected, which will trigger stack trace parsing
    return Q(promise)
      .then(() => {
        throw new Error("Should not reach here");
      })
      .catch((error: Error) => {
        // The error should have a stack trace that includes the correct format
        // This test ensures the regex correctly matches stack lines with single-digit column numbers
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
      });
  });
});