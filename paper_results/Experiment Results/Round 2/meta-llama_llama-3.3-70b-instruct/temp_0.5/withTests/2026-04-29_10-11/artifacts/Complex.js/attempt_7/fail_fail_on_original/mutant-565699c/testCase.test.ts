import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.cos().sub(1).re;
    const expected = Math.cos(Math.PI / 4) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});