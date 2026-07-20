import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.0001);
    const result = complex.cos().sub(1).re;
    const expected = Math.cos(0.0001) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});