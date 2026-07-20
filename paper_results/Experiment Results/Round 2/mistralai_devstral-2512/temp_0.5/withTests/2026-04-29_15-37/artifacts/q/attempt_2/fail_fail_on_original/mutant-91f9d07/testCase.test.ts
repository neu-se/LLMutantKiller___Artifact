// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-91f9d07/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should not throw an error when callback is undefined in the mutated version", () => {
    expect(() => {
      Q.denodeify(undefined);
    }).not.toThrow();
  });
});