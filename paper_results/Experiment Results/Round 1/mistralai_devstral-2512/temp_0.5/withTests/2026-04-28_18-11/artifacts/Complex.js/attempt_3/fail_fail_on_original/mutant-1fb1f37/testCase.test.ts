import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should use the Taylor series approximation for small values', () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code should use the Taylor approximation (1 - x) for small x
    // The mutated code always uses the full formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // For x = 1e-10, the Taylor approximation gives 1 - 1e-10
    // The full formula gives approximately 1 + (1e-10)^2/2
    // These should be different enough to detect the mutation
    expect(result.re).toBeLessThan(1);
  });
});