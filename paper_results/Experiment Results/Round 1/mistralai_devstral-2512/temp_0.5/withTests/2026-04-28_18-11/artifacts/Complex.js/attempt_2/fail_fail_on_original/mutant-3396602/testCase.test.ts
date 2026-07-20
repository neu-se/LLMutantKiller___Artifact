import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant of a complex number with real part 0.5 and imaginary part 0.5', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.csc();
    // The original code computes: 0.5 * cosh(1) - 0.5 * cos(1)
    // The mutated code computes: 0.5 * cosh(1) - 0.5 / cos(1)
    // This creates a significant difference in the result
    expect(result.re).toBeCloseTo(1.0782, 4);
    expect(result.im).toBeCloseTo(-0.4855, 4);
  });
});