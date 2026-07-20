// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-711300e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw error when parsing object with only one property (re or im)", () => {
    expect(() => new Complex({ re: 5 })).toThrow(SyntaxError);
    expect(() => new Complex({ im: 3 })).toThrow(SyntaxError);
  });
});