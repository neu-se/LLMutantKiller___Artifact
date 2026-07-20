import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    expect(() => {
      const complex = new Complex(NaN, 1);
      if (!isNaN(complex.re) || !isNaN(complex.im)) {
        throw new Error("Expected NaN");
      }
    }).toThrowError("Expected NaN");
  });
});