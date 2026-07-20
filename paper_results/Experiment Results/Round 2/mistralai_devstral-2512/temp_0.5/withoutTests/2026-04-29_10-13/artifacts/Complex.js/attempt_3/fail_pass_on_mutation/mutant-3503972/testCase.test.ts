// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch() with zero real and non-zero imaginary component", () => {
  it("should return correct imaginary component sign for acsch(0 + 1i)", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The mutation changes the sign of the imaginary component when b !== 0
    // Original: (b !== 0) ? -b / 0 : 0
    // Mutated: (b !== 0) ? +b / 0 : 0
    // This should affect the sign of the imaginary part in the result
    expect(Math.sign(result.im)).toBe(-1);
  });
});