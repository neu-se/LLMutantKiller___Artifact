import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small complex number', () => {
    const complex = new Complex(0.1, 0.1);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(0.1) * Math.cos(0.1), Math.exp(0.1) * Math.sin(0.1));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});