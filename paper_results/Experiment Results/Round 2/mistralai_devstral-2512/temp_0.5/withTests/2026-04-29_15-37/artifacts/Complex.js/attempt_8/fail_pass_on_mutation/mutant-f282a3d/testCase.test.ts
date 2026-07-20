// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle empty string in complex number parsing", () => {
    // This test will pass on original code (throws SyntaxError)
    // but fail on mutated code (incorrectly parses empty string as 'I')
    expect(() => new Complex("3+")).toThrow(SyntaxError);
  });
});