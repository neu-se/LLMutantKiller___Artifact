import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific case', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    const expected = new Complex(Math.cosh(Math.acosh(2)), 0);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});