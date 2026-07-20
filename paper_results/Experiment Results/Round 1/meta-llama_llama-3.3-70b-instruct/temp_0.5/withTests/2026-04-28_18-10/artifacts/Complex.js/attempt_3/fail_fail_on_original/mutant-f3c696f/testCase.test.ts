import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    const originalResult = new Complex((1 / (1 * 1 + 1 * 1)), -(1 / (1 * 1 + 1 * 1)));
    const expected = new Complex(Math.atan2(1, 1), 0);
    expect(result.re).not.toBeCloseTo(originalResult.re);
    expect(result.im).not.toBeCloseTo(originalResult.im);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});