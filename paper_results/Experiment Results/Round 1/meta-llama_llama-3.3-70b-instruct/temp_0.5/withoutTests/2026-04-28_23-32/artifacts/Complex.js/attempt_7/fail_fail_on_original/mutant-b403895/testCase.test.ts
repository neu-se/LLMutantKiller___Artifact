import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.asec();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    expect(complex.asec().re).not.toBe(complex2.asec().re * 0);
  });
});