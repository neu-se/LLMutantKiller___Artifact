// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-7259959/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator handling", () => {
  it("should properly handle generator completion with done property", async () => {
    const result = await Q.async(function* () {
      yield Q.delay(10);
      return "completed";
    })();

    expect(result).toBe("completed");
  });
});