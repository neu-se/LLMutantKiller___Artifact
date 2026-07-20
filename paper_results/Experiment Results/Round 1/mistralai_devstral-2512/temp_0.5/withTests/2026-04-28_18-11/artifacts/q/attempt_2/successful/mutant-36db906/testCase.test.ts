// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-36db906/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.denodeify", () => {
  it("should throw an error when callback is undefined", () => {
    expect(() => {
      Q.denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});