// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f918cff/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise descriptor exception handling", () => {
  it("should handle exceptions in descriptor methods correctly", () => {
    const testError = new Error("descriptor error");
    let fulfillmentCalled = false;
    let rejectionCalled = false;

    const promise = Q.makePromise({
      when: function() {
        throw testError;
      }
    });

    return promise.then(
      () => {
        fulfillmentCalled = true;
      },
      (error: Error) => {
        rejectionCalled = true;
        expect(error).toBe(testError);
      }
    ).then(() => {
      // Check which handler was called
      if (fulfillmentCalled) {
        // This happens in the mutated version where exception is swallowed
        throw new Error("Promise was fulfilled when it should have been rejected");
      }
      expect(rejectionCalled).toBe(true);
    });
  });
});