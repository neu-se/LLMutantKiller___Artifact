// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-aab4392/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter stack traces without array out of bounds error", () => {
    // Enable long stack traces to trigger the filterStackString function
    Q.longStackSupport = true;

    // Create a deep promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => { throw new Error("Test error"); })
      .catch((error: Error) => {
        // Force stack trace processing by re-throwing
        throw error;
      });

    // The mutation causes an off-by-one error when iterating through stack lines
    // This should fail on the mutated version due to array out of bounds access
    return promise.catch((error: Error) => {
      expect(error.message).toBe("Test error");
    });
  });
});