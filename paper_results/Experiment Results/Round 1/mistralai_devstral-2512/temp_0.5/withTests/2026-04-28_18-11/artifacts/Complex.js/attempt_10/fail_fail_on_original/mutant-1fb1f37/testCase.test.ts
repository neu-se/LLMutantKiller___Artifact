import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should use Taylor approximation for small values', () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses Taylor approximation (1 - x) for |x| < 1e-9
    // The mutated code always uses the full formula
    // For x = 1e-10, the Taylor approximation gives 1 - 1e-10
    // The full formula gives (exp(1e-10) + exp(-1e-10))/2
    // The difference should be detectable with a relative comparison
    const expectedTaylor = 1 - 1e-10;
    const expectedFull = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;
    // The result should be closer to the Taylor approximation than the full formula
    expect(Math.abs(result.re - expectedTaylor)).toBeLessThanOrEqual(Math.abs(result.re - expectedFull));
  });
});