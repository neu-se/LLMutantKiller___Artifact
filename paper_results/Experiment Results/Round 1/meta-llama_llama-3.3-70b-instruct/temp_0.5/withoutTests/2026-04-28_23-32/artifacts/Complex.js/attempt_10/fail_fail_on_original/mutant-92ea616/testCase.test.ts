import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    const d = c.re * c.re + c.im * c.im;
    expect(d).not.toBe(0);
    const resultMutated = new Complex(1, 1);
    resultMutated.re = 0;
    resultMutated.im = 0;
    const resultMutatedAcot = resultMutated.acot();
    expect(resultMutatedAcot.re).toBe(Infinity);
    expect(resultMutatedAcot.im).toBe(Infinity);
  });
});