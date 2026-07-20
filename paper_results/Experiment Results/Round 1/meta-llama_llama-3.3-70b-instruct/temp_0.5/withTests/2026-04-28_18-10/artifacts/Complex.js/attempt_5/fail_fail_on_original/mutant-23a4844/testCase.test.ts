import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const complex = new Complex(-1.5, 0);
    const result = complex.atanh();
    const originalResult = new Complex(-0.5493061443340548, 0);
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});