// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f918cff/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

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
      (rejectedError) => {
        expect(rejectedError).toBe(error);
      }
    );
  });
});