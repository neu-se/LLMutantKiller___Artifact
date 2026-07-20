import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    const originalResult = new Complex(0, -Math.PI / 2);
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});