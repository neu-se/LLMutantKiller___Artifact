import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const mutatedComplex = new Complex(0, 0);
    const mutatedResult = mutatedComplex.asech();
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 10);
    expect(result.im).not.toBeCloseTo(mutatedResult.im, 10);
  });
});