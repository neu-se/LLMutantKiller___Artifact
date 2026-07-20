import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const complex = new Complex(0.01);
    const result = complex.expm1();
    const expected = new Complex(Math.exp(0.01) * Math.cos(0) - 1, Math.exp(0.01) * Math.sin(0));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});