// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values near the threshold", () => {
    const z = new Complex(1e-9, 0); // Value exactly at the threshold
    const result = z.cosh();
    // For x = 1e-9, the original uses the Taylor approximation (1 - x)
    // The mutated version uses the exponential formula
    // Taylor: 1 - 1e-9 ≈ 0.999999999
    // Exponential: (exp(1e-9) + exp(-1e-9)) * 0.5 ≈ 1.0000000000005
    expect(result.re).toBeCloseTo(0.999999999, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});