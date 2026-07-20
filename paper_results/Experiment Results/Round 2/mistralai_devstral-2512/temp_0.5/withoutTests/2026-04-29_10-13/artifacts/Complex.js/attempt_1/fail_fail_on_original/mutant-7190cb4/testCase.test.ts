// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7190cb4/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should return correct result for complex number with zero real part and non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes the sign of the imaginary part in the edge case
    // For (0, 1), the original returns a complex number with negative imaginary infinity
    // The mutated version would return positive imaginary infinity
    expect(result.im).toBe(-Infinity);
  });
});