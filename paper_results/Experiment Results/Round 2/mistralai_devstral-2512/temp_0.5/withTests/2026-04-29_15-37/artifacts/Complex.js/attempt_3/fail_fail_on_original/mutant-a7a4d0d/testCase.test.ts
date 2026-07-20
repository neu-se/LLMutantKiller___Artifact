// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the sign of the imaginary part in acosh result", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The original code swaps real and imaginary parts when result.im <= 0
    // The mutant always swaps them (if (true))
    // For input (1,1), the correct result has positive imaginary part
    // Original: should NOT swap (im > 0)
    // Mutant: will swap (always true)
    // So original returns (re, im) while mutant returns (im, re)
    expect(result.re).toBeCloseTo(0.9624236501192069);
    expect(result.im).toBeCloseTo(1.0612750619050357);
  });
});