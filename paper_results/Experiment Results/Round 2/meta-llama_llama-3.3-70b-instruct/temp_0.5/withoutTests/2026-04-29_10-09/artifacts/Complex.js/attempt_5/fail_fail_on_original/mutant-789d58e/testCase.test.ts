import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.cos().re - 1;
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected)).toBeLessThan(1e-9);
  });
});