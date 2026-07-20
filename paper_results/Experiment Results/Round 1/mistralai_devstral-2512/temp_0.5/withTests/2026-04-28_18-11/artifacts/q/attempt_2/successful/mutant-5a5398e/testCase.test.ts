// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5a5398e/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.denodeify error message test", () => {
  it("should throw an error with descriptive message when given undefined function", () => {
    expect(() => {
      Q.denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});