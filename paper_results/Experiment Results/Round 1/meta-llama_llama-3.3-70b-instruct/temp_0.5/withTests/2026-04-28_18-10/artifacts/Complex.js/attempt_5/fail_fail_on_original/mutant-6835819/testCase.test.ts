import { Complex } from "./complex";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549, 5);
    expect(result.im).toBeCloseTo(0, 5);
    const mutatedComplex = new Complex(1.5, 0);
    const mutatedResult = mutatedComplex.atanh();
    expect(mutatedResult.re).not.toBeCloseTo(result.re, 5);
  });
});