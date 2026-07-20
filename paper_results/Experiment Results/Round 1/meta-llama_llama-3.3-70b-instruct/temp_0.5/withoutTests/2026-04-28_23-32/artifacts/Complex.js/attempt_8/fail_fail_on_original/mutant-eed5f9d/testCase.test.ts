import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a finite value when calculating acsch for a = 1 and b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});