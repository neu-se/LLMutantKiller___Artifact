// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-aab432/testCase.test.ts
import { Q } from "./q.js";

describe("Q library stack trace filtering", () => {
  it("should correctly filter stack traces without throwing errors", () => {
    // Create a scenario that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be handled to trigger stack trace processing
    return promise.catch((error) => {
      // The error should be caught without issues
      expect(error.message).toBe("Test error");
    });
  });
});