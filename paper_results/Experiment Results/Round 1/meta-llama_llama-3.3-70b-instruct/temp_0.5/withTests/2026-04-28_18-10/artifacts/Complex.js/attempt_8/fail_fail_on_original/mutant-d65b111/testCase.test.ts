import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
    expect(isFinite(result.re)).toBe(true);
  });
});