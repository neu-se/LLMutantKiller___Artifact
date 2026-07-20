import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should not return Math.PI / 2, Infinity for acsc of (1, 1)', () => {
    const c = new Complex(1, 1);
    expect(c.acsc().re).not.toBeCloseTo(Math.PI / 2);
    expect(c.acsc().im).not.toBe(Infinity);
  });
});