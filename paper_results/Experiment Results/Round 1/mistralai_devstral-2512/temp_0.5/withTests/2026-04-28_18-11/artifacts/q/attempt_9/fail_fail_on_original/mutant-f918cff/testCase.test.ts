// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f918cff/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise descriptor exception handling", () => {
  it("should reject when descriptor when method throws an exception", () => {
    const testError = new Error("descriptor error");

    // Create a promise using the descriptor pattern that goes through the mutated code
    const promise = Q.makePromise({
      when: function() {
        throw testError;
      }
    });

    return promise.then(
      () => {
        // In mutated version, this gets called because exception is swallowed
        throw new Error("UNEXPECTED_FULFILLMENT");
      },
      (error: Error) => {
        // In original version, this should be called
        expect(error).toBe(testError);
      }
    );
  });
});