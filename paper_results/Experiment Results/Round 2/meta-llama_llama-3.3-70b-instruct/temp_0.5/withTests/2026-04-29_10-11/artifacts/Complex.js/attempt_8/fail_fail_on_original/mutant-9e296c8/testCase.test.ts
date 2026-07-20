import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly for the original code', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    const mutatedComplex = new Complex(1, 1);
    const mutatedResult = mutatedComplex.csch();
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
    expect(result.im).not.toBeCloseTo(mutatedResult.im, 5);
  });
});