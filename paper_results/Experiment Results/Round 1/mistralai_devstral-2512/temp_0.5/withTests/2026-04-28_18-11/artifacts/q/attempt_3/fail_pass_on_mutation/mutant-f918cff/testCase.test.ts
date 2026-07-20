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

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (rejectedError: Error) => {
        expect(rejectedError).toBe(error);
      }
    ).catch((e: Error) => {
      // In the mutated version, the exception is swallowed and result is resolved
      // This catch block will handle the "Promise should have been rejected" error
      // thrown in the fulfillment handler
      expect(e.message).toBe("Promise should have been rejected");
    });
  });
});