import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function with d not equal to zero', () => {
    const complex = new Complex(1, 1);
    const a = complex.re;
    const b = complex.im;
    const d = a * a + b * b;
    expect(d).not.toBe(0);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});