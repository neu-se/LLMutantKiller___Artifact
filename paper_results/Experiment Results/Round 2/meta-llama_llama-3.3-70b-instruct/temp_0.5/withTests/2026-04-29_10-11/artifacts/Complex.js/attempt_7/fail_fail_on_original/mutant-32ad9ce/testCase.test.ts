import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, 1);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBe(1);
    const complex2 = new Complex(1, NaN);
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBeNaN();
    expect(() => new Complex(NaN, NaN)).toThrow();
  });
});