import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should not return NaN when asec is called with a non-zero value', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(!isNaN(result.re)).toBe(true);
    expect(!isNaN(result.im)).toBe(true);
  });
});