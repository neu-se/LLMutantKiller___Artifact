import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a specific input', () => {
    const complex = new Complex(Math.PI, 0);
    const result = complex.cosh();
    const expected = Math.cosh(Math.PI);
    expect(result.re).toBeCloseTo(expected);
    expect(result.im).toBeCloseTo(0);
  });
});