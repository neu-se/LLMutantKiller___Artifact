// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should use Taylor approximation for small values near zero", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // For very small x, cosh(x) ≈ 1 + x²/2
    // The original uses 1 - x for |x| < 1e-9 (incorrect)
    // The mutant uses 1 - x for |x| >= 1e-9 (also incorrect but different)
    // We test that the result matches the correct formula
    const expected = 1 + (1e-10 * 1e-10) / 2;
    expect(result.re).toBeCloseTo(expected, 15);
    expect(result.im).toBe(0);
  });
});