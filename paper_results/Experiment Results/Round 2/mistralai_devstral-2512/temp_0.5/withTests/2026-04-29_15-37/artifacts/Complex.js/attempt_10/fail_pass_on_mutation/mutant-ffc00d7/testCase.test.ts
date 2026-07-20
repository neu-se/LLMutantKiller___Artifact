// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string with trailing operator", () => {
    expect(() => new Complex("1+")).toThrow(SyntaxError);
  });
});