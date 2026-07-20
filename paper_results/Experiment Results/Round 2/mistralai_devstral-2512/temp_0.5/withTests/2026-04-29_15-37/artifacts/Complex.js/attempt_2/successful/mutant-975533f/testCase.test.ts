import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acoth()', () => {
  it('should correctly compute the hyperbolic arccotangent for a complex number with non-zero imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    // The mutation changes the sign of the imaginary part in the acoth calculation
    // For input (1, 1), the correct result should have a specific imaginary component
    // We'll verify the imaginary part is negative (as per the original implementation)
    expect(result.im).toBeCloseTo(-0.5536, 4);
  });
});