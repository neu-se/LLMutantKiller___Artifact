import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small complex number', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x) * Math.cos(0) + Math.cos(x) * Math.sin(0) * Math.sinh(0), Math.sin(x) * Math.sinh(0));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});