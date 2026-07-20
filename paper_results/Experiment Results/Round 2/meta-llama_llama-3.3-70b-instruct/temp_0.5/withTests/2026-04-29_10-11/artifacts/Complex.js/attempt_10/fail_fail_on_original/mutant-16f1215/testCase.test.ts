import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for non-zero values', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
  });
});