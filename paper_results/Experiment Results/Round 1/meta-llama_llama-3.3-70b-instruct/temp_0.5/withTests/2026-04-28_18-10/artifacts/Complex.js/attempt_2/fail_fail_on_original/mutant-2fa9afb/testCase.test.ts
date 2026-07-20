import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should return Math.PI / 2 for acsc of (0, 1)', () => {
    const c = new Complex(0, 1);
    expect(c.acsc().re).toBeCloseTo(Math.PI / 2);
  });
});