import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBe(0);
    expect(result.im).toBeCloseTo(0);
    expect(isFinite(result.re)).toBe(true);
  });
});