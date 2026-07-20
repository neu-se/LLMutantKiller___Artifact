import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    const originalResult = new Complex(0.6636123605477749, -2.437587736496052);
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});