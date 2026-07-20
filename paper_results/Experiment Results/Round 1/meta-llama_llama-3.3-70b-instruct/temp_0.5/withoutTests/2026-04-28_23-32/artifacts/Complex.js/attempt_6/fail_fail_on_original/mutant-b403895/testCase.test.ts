import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Infinity, 10);
    expect(complex.asec().re).not.toBe(complex2.asec().re * 0);
  });
});