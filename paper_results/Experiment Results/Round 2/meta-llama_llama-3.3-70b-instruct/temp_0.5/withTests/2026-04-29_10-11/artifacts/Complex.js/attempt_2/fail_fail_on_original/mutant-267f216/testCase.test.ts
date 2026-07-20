import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    const originalResult = new Complex(0.4811945734682642, -0.89681021452633);
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});