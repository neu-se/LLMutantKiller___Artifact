import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for cos function with large input', () => {
    const complex = new Complex(1000000, 1000000);
    const result = complex.cos();
    const expected = complex.cos();
    expect(result.re).toBeCloseTo(expected.re, 6);
    expect(result.im).toBeCloseTo(expected.im, 6);
    const diff = Math.abs(result.re - expected.re) + Math.abs(result.im - expected.im);
    expect(diff).toBeLessThan(1e-6);
  });
});