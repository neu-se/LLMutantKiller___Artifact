import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should not return Math.PI / 2, Infinity for acsc of (1, 1)', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).not.toBeCloseTo(Math.PI / 2);
    expect(result.im).not.toBe(Infinity);
  });
});