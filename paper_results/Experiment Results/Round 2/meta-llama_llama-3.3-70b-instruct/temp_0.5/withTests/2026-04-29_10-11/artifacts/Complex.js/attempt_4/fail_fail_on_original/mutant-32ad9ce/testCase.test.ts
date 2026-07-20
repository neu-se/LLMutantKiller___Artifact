import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, NaN);
    expect(() => new Complex(NaN, NaN)).toThrow();
  });
});