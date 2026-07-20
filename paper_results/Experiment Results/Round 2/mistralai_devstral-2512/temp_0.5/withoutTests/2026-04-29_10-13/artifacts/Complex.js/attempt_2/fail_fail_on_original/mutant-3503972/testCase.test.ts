// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch() with imaginary component", () => {
  it("should return correct result for acsch(0 + 1i)", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    // The original code should return a complex number with negative imaginary infinity
    // The mutated code would return positive imaginary infinity
    expect(result.im).toBe(-Infinity);
  });
});