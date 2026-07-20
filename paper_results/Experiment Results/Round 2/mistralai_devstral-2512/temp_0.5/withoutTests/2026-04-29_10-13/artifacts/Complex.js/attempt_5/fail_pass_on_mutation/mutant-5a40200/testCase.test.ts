// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values just above the threshold", () => {
    const z = new Complex(2e-9, 0); // Value just above the threshold
    const result = z.cosh();
    // For x = 2e-9, the original uses the exponential formula
    // The mutated version incorrectly uses the Taylor approximation
    // Exponential: (exp(2e-9) + exp(-2e-9)) * 0.5 ≈ 1.000000000002
    // Taylor: 1 - 2e-9 = 0.999999998
    expect(result.re).toBeCloseTo(1.000000000002, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});