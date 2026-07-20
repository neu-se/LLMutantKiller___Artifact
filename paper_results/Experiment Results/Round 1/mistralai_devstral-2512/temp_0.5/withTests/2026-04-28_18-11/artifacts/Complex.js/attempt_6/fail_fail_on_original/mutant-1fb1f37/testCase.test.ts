import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should use Taylor approximation for small values near zero', () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses Taylor approximation (1 - x) for |x| < 1e-9
    // The mutated code always uses the full formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // For x = 1e-10:
    // Taylor: 1 - 1e-10 = 0.9999999999
    // Full formula: ~1.00000000005
    // The difference is about 1.5e-10, which should be detectable with high precision
    expect(Math.abs(result.re - (1 - 1e-10))).toBeLessThan(1e-15);
  });
});