// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-382b9b0/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
  it("should return a promise when called without a nodeback", () => {
    const promise = Q.resolve(42);
    const result = promise.nodeify();
    expect(result).toBeInstanceOf(Promise);
    return result.then((value) => {
      expect(value).toBe(42);
    });
  });
});