import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    try {
      const complex = new Complex(NaN, NaN);
      expect(complex.re).toBeNaN();
      expect(complex.im).toBeNaN();
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError);
    }
  });
});