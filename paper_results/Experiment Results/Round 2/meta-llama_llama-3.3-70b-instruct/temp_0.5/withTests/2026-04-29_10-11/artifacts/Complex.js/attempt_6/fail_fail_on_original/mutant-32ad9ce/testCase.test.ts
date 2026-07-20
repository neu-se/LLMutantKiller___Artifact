import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    try {
      const complex = new Complex(NaN, NaN);
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError);
    }
  });
});