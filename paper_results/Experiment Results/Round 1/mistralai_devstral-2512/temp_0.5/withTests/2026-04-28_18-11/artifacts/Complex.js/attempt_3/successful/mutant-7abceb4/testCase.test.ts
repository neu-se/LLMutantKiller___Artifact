// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7abceb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle non-zero imaginary part in acsch calculation", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the condition from `if (b === 0)` to `if (true)`
    // This should cause incorrect behavior when b !== 0
    // For a complex number with non-zero imaginary part, the result should not be purely real
    expect(result.im).not.toBe(0);
  });
});