import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const complexMutated = new Complex(1, 1);
    const resultMutated = new Complex(complexMutated.re * (complexMutated.re * complexMutated.re + complexMutated.im * complexMutated.im), -complexMutated.im * (complexMutated.re * complexMutated.re + complexMutated.im * complexMutated.im)).asinh();
    expect(result.re).not.toBeCloseTo(resultMutated.re, 5);
    expect(result.im).not.toBeCloseTo(resultMutated.im, 5);
  });
});