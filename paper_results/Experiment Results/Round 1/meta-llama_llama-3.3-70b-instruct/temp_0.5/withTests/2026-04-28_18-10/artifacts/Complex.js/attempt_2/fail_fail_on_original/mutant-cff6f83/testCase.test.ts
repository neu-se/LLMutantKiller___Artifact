import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acsch();
    const complexMutated = new Complex(1, 1);
    // Simulate the mutation
    const resultMutated = new Complex(complexMutated.re * (complexMutated.re * complexMutated.re + complexMutated.im * complexMutated.im), -complexMutated.im * (complexMutated.re * complexMutated.re + complexMutated.im * complexMutated.im)).asinh();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 5);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 5);
  });
});