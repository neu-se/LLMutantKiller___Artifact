import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(10, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(Math.cosh(10));
    expect(result.im).toBeCloseTo(0);
  });
});