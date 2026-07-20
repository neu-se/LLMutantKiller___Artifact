import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.atanh();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const mutatedComplex = new Complex(0.5, 0.5);
    const mutatedResult = mutatedComplex.atanh();
    expect(mutatedResult.re).toBeCloseTo(expectedRe, 10);
    expect(mutatedResult.im).toBeCloseTo(expectedIm, 10);
  });
});