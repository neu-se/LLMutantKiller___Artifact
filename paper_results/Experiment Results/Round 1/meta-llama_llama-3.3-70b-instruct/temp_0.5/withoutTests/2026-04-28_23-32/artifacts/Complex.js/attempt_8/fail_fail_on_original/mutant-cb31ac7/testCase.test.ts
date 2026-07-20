import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small complex number', () => {
    const x = 0.00001;
    const y = 0.00001;
    const complex = new Complex(x, y);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x) * Math.cos(y) + Math.cos(x) * Math.sin(y) * Math.sinh(y), Math.sin(x) * Math.sinh(y));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});