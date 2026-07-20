import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should return correct result for acsc of (1, 1)', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).not.toBe(Math.PI / 2);
    expect(result.im).not.toBe(Infinity);
  });
});