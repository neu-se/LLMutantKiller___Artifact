import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should correctly compute cosh for values where Taylor approximation applies', () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses Taylor approximation (1 - x) for |x| < 1e-9
    // The mutated code always uses the full formula
    // For x = 1e-10, Taylor gives 1 - 1e-10 = 0.9999999999
    // Full formula gives (exp(1e-10) + exp(-1e-10))/2 ≈ 1 + (1e-10)^2/2 ≈ 1.00000000005
    // The difference should be detectable
    expect(result.re).toBeCloseTo(0.9999999999, 9);
  });
});