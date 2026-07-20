import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.0001);
    const result = Math.cos(complex.re) - 1;
    const expected = complex.cos().sub(1).re;
    expect(result).toBeCloseTo(expected, 10);
  });
});