// Test case to detect the mutation in the asech method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech method', () => {
  it('should correctly compute asech for a complex number with non-zero imaginary part', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes the calculation of d from a*a + b*b to a*a + b/b
    // This will cause incorrect results for non-zero imaginary parts
    // We expect the original implementation to produce a specific result
    expect(result.re).toBeCloseTo(0.5706, 3);
    expect(result.im).toBeCloseTo(-0.5236, 3);
  });
});