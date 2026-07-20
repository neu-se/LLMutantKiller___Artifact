import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for exp when the imaginary part is not zero and the real part is zero', () => {
    const complex = new Complex(0, 1);
    const resultOriginal = new Complex(Math.cos(1), Math.sin(1));
    const result = complex.exp();
    expect(result.re).toBeCloseTo(resultOriginal.re);
    expect(result.im).toBeCloseTo(resultOriginal.im);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.exp();
    expect(result2.re).toBeCloseTo(1);
    expect(result2.im).toBeCloseTo(0);
  });
});