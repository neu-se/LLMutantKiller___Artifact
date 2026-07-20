// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function through cos", () => {
  it("should correctly compute cos for values near the threshold", () => {
    // Create a complex number with imaginary part = 1e-9
    // cos(z) = cos(a)cosh(b) - i sin(a)sinh(b)
    // For z = 0 + 1e-9i, this becomes cosh(1e-9)
    const z = new Complex(0, 1e-9);
    const result = z.cos();

    // Calculate expected values
    const exponentialCosh = (Math.exp(1e-9) + Math.exp(-1e-9)) * 0.5;
    const taylorCosh = 1 - 1e-9;

    // Original should use exponential formula (result.re ≈ 1.0000000000005)
    // Mutated would use Taylor approximation (result.re = 0.999999999)
    expect(result.re).toBeCloseTo(exponentialCosh, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});