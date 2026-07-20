import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the expm1 function for a small real number', () => {
    const c = new Complex(0.000001, 0);
    const expm1 = c.expm1();
    const expected = new Complex(Math.expm1(0.000001), 0);
    expect(expm1.re).toBeCloseTo(expected.re, 10);
    expect(expm1.im).toBeCloseTo(expected.im, 10);
  });
});