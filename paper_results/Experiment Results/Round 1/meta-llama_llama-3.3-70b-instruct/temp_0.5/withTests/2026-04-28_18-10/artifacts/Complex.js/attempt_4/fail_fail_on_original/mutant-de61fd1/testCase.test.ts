import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(0, 1);
    const sech = complex.sech();
    const expected = new Complex(2 * Math.cosh(0) * Math.cos(2) / (Math.cos(2) + Math.cosh(0)), -2 * Math.sinh(0) * Math.sin(2) / (Math.cos(2) + Math.cosh(0)));
    expect(sech.re).toBeCloseTo(expected.re);
    expect(sech.im).toBeCloseTo(expected.im);
  });
});