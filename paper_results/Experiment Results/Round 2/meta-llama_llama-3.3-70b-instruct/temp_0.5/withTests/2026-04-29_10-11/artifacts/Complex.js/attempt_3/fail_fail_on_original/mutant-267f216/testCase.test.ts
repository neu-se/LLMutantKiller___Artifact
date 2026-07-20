import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(2, 2);
    const result = c.acsch();
    const originalResult = c.asinh();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});