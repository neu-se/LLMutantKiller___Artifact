import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate sech with the correct imaginary part', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(sech.im).toBeCloseTo(-2 * Math.sinh(2) * Math.sin(2) / (Math.cos(4) + Math.cosh(4)), 10);
  });
});