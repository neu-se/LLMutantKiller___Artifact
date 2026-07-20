// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f918cff/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise descriptor exception handling", () => {
  it("should reject when descriptor method throws an exception", () => {
    const error = new Error("test error");
    const promise = Q.makePromise({
      when: function() {
        throw error;
      }
    });

    let rejectionHandled = false;
    let fulfillmentHandled = false;

    return promise.then(
      () => {
        fulfillmentHandled = true;
      },
      (rejectedError: Error) => {
        rejectionHandled = true;
        expect(rejectedError).toBe(error);
      }
    ).then(() => {
      // In the original code, the promise should be rejected
      // In the mutated code, the exception is swallowed and the promise is fulfilled
      if (fulfillmentHandled) {
        throw new Error("Promise was unexpectedly fulfilled");
      }
      expect(rejectionHandled).toBe(true);
    });
  });
});