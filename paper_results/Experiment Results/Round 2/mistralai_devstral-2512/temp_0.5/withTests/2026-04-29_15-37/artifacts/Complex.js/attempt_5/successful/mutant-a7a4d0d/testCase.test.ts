// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the sign of the imaginary part in acosh result", () => {
    const c = new Complex(2, 0); // Real number > 1
    const result = c.acosh();
    // For real numbers > 1, acosh should return a real result
    // The original code should not swap (im = 0, condition is im <= 0)
    // The mutant will always swap (if true)
    // So original returns (re, 0) while mutant returns (0, re)
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});