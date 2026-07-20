import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should use Taylor approximation for very small values', () => {
    // Create a complex number with a very small real part
    const z = new Complex(1e-10, 0);
    const result = z.cosh();

    // The original code uses Taylor approximation (1 - x) for |x| < 1e-9
    // which gives 0.9999999999 for x = 1e-10
    // The mutated code always uses the full formula which gives ~1.00000000005
    // We test that the result is NOT exactly 1 (which would happen with mutation)
    expect(result.re).not.toBe(1);
    expect(result.re).toBeCloseTo(0.9999999999, 10);
  });
});