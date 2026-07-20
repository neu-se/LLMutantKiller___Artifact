// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values just below the threshold", () => {
    const z = new Complex(0.5e-9, 0); // Value just below the threshold
    const result = z.cosh();
    // For x = 0.5e-9, the original uses the Taylor approximation (1 - x)
    // The mutated version uses the exponential formula
    // Taylor: 1 - 0.5e-9 = 0.9999999995
    // Exponential: (exp(0.5e-9) + exp(-0.5e-9)) * 0.5 ≈ 1.000000000000125
    expect(result.re).toBeCloseTo(0.9999999995, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});