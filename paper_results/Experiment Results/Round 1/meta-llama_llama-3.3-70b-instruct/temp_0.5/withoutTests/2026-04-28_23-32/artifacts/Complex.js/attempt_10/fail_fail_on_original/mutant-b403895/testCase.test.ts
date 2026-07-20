import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asec();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Infinity, 10);
    expect(complex.asec().re).not.toBeNaN();
    expect(complex2.asec().re).not.toBeNaN();
    expect(complex.asec().re).not.toBe(complex2.asec().re * 0);
    expect(complex.asec().re).toBe((a !== 0) ? a / 0 : 0);
  });
});