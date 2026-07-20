import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    const expected = new Complex(
      2 * Math.cosh(1) * Math.cos(2) / (Math.cos(4) + Math.cosh(2)),
      -2 * Math.sinh(1) * Math.sin(2) / (Math.cos(4) + Math.cosh(2))
    );
    expect(sech.equals(expected.re, expected.im)).toBe(true);
  });
});