import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should return a result for acsc of (1, 1) that is not Math.PI / 2, Infinity', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).not.toBeCloseTo(Math.PI / 2);
    expect(result.im).not.toBe(Infinity);
  });
});