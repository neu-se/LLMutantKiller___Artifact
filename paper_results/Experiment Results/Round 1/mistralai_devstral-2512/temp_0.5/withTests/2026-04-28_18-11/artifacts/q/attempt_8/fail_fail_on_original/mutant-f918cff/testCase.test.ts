// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f918cff/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise descriptor exception handling", () => {
  it("should reject when descriptor when method throws an exception", () => {
    const testError = new Error("descriptor error");
    const promise = new Q.Promise({
      when: function() {
        throw testError;
      }
    });

    return promise.then(
      () => {
        // This should not be called in the original code
        throw new Error("Promise should have been rejected but was fulfilled");
      },
      (error: Error) => {
        // This should be called in the original code
        expect(error).toBe(testError);
      }
    );
  });
});