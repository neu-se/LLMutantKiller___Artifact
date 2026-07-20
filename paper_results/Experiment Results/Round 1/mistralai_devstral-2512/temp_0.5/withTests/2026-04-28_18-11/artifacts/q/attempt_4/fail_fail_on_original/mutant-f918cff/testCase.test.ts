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

    let fulfilled = false;
    let rejected = false;

    return promise.then(
      () => {
        fulfilled = true;
      },
      (rejectedError: Error) => {
        rejected = true;
        expect(rejectedError).toBe(error);
      }
    ).then(() => {
      // In the original code, the promise should be rejected
      // In the mutated code, the exception is swallowed and the promise is fulfilled
      expect(rejected).toBe(true);
      expect(fulfilled).toBe(false);
    });
  });
});