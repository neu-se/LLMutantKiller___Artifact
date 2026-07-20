// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-91f9d07/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should throw error with specific message when callback is undefined", () => {
    try {
      Q.denodeify(undefined);
      fail("Expected to throw an error");
    } catch (error) {
      expect(error.message).toBe("Q can't wrap an undefined function");
    }
  });
});