// Test case to detect the mutation in the csc function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant of a complex number with specific real and imaginary parts', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.csc();
    // The mutation changes the denominator calculation from subtraction to division
    // This will cause a significant difference in the result when cos(2a) is small
    // For a=0.5, cos(1) ≈ 0.5403, so the original computes 0.5*cosh(1) - 0.5*0.5403
    // The mutant computes 0.5*cosh(1) - 0.5/0.5403, which is very different
    expect(result.re).toBeCloseTo(1.1518, 4);
    expect(result.im).toBeCloseTo(-0.4855, 4);
  });
});