// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7190cb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct sign for imaginary part when real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes the sign of the imaginary part in the edge case
    // For (0, 1), the original returns a complex number with negative imaginary part
    // The mutated version would return positive imaginary part
    expect(result.im).toBeLessThan(0);
  });
});