import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should not be NaN when calculating acsch for a = 1 and b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(!isNaN(result.re)).toBe(true);
    expect(!isNaN(result.im)).toBe(true);
  });
});