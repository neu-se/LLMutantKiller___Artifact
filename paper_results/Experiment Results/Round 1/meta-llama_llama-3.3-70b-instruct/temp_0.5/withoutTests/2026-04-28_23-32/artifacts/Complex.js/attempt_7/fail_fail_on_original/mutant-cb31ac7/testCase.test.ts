import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small complex number', () => {
    const x = 0.00001;
    const y = 0.00001;
    const complex = new Complex(x, y);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x) * Math.cos(y), Math.expm1(x) * Math.sin(y));
    expect(result.re).toBeCloseTo(expected.re, 12);
    expect(result.im).toBeCloseTo(expected.im, 12);
  });
});