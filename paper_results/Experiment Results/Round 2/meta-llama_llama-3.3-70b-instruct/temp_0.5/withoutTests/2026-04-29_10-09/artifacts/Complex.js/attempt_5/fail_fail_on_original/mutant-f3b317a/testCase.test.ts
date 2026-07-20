import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with finite real and imaginary parts for asec when a and b are not 0', () => {
    const complex = new Complex(1, 1);
    const result = complex['asec']();
    expect(isFinite(result['re'])).toBe(true);
    expect(isFinite(result['im'])).toBe(true);
  });
});