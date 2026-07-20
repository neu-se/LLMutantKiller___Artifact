import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalResult = new Complex(1, 1);
    const original = originalResult.acsc();
    expect(result.re).toBeCloseTo(original.re, 10);
    expect(result.im).toBeCloseTo(original.im, 10);
  });
});