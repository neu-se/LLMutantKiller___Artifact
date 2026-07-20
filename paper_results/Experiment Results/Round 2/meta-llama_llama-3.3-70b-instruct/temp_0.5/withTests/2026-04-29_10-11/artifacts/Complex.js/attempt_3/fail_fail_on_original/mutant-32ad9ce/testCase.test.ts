import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, 1);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBe(1);
  });
});