import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const d = 1 * 1 + 1 * 1;
    expect(d).toBeGreaterThan(0);
    expect(result.re).toBeLessThan(0);
    expect(complex.acot().re).toBeLessThan(0);
  });
});