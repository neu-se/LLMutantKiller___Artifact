import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});