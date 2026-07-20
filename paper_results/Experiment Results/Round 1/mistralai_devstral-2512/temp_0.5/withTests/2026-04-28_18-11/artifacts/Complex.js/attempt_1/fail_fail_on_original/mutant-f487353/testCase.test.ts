// Test case to detect the mutation in the csc method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc() method', () => {
  it('should correctly compute the cosecant of a complex number with non-zero imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The correct result should have a negative imaginary part due to the negative sign in the original formula
    // For c = 1 + i, csc(c) should have a negative imaginary component
    expect(result.im).toBeCloseTo(-0.3181315052047641, 10);
  });
});