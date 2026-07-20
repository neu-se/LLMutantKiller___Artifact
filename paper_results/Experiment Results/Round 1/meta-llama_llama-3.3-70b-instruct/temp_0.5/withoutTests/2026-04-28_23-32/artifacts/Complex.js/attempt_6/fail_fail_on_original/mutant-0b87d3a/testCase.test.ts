import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly for a complex number with a non-zero denominator', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});