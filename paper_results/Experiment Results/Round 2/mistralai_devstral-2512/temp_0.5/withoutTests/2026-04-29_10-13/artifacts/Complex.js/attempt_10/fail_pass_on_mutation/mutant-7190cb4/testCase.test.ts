// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7190cb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct result for complex number with zero real part and non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes the sign of the imaginary part in the edge case
    // For (0, 1), the original returns a complex number with negative imaginary part
    // The mutated version would return positive imaginary part
    expect(result.im).toBeCloseTo(-0.8813735870195429, 10);
  });
});