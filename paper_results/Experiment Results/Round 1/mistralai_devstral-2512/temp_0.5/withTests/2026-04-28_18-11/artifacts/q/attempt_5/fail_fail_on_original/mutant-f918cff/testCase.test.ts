// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f918cff/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise descriptor exception handling", () => {
  it("should properly handle exceptions in promise descriptors", () => {
    const error = new Error("test error");
    const promise = Q.makePromise({
      when: function() {
        throw error;
      }
    });

    return promise.then(
      () => {
        // In the mutated version, this will be called because the exception is swallowed
        throw new Error("UNEXPECTED_FULFILLMENT");
      },
      (rejectedError: Error) => {
        // In the original version, this should be called
        expect(rejectedError).toBe(error);
      }
    );
  });
});