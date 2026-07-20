// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch() edge case with zero real and non-zero imaginary", () => {
  it("should handle division by zero correctly for acsch(0 + 1i)", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The mutation changes the sign in the division by zero case
    // Original: (b !== 0) ? -b / 0 : 0
    // Mutated: (b !== 0) ? +b / 0 : 0
    // This affects the intermediate calculation which should propagate to the final result
    expect(result.im).toBeLessThan(0);
  });
});