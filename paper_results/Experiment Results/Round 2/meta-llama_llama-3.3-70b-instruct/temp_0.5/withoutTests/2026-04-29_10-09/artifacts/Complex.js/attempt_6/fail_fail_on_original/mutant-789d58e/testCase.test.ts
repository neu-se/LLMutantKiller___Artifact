import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 for small x', () => {
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.cos().re - 1;
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});