// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-aab4392/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly handle stack trace filtering without array out of bounds error", () => {
    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    // The mutation causes an off-by-one error in the stack trace filtering
    // This test forces stack trace processing by enabling long stack support
    Q.longStackSupport = true;

    // Return the promise chain to ensure proper handling
    return promise
      .catch((error: Error) => {
        expect(error.message).toBe("Test error");
        // If we get here without throwing, the stack trace filtering worked
        return "success";
      });
  });
});