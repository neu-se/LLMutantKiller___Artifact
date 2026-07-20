import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.2553419474064545, 10);
    expect(result.im).toBeCloseTo(-0.5493061443340548, 10);
    const mutatedComplex = new Complex(0.5, 0.5);
    const mutatedResult = mutatedComplex.atanh();
    expect(mutatedResult.re).not.toBeCloseTo(result.re, 10);
    expect(mutatedResult.im).not.toBeCloseTo(result.im, 10);
  });
});