import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the expm1 function', () => {
    const c = new Complex(0.1, 0);
    const expm1 = c.expm1();
    const expected = new Complex(Math.expm1(0.1), 0);
    expect(expm1.re).toBeCloseTo(expected.re, 10);
    expect(expm1.im).toBeCloseTo(expected.im, 10);
    const x = 0.1;
    const result = Math.expm1(x) * Math.cos(x) + Math.cos(x) - 1;
    expect(result).toBeCloseTo(expm1.re, 10);
  });
});