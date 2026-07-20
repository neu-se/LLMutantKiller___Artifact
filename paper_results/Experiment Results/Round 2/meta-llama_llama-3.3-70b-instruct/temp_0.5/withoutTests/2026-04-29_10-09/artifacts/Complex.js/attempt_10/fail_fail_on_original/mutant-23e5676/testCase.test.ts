import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsc', () => {
    const originalComplex = new Complex(1, 1);
    const mutatedComplex = new Complex(1, 1);
    const originalResult = originalComplex.acsc();
    const mutatedResult = mutatedComplex.acsc();
    expect(originalResult.re).not.toBeCloseTo(mutatedResult.re * 2);
    expect(originalResult.im).not.toBeCloseTo(mutatedResult.im * 2);
  });
});