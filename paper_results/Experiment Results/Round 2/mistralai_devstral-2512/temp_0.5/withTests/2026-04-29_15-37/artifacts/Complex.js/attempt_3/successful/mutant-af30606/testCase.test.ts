import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute sech for a complex number with real part 0.5 and imaginary part 0.5', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // Calculate expected values using the correct formula
    const a = 0.5;
    const b = 0.5;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});