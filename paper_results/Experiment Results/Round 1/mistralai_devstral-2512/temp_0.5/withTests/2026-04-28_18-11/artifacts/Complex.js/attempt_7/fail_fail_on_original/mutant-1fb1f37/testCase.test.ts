import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should use Taylor approximation for small values', () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses Taylor approximation (1 - x) for |x| < 1e-9
    // The mutated code always uses the full formula
    // For x = 1e-10, the Taylor approximation gives exactly 1 - 1e-10
    // The full formula gives approximately 1 + (1e-10)^2/2
    // The difference should be detectable with a precision test
    expect(result.re).toBeCloseTo(1 - 1e-10, 14);
  });
});