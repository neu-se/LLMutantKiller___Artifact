// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b58d5f8/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string with special characters that don't match regex", () => {
    expect(() => {
      new Complex("!@#");
    }).toThrow(SyntaxError);
  });
});