// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d44b51f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior with different values", () => {
  it("should throw an error with a specific message when values are not the same", () => {
    const x = 1;
    const y = 2;
    return Q.join(x, y)
      .then(() => {
        throw new Error("Expected promise to be rejected");
      })
      .catch((error: Error) => {
        expect(error.message).toBe("Q can't join: not the same: 1 2");
      });
  });
});