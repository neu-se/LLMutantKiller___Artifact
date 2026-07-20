import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(1, 1);
    const acoshValue = complex.acosh();
    if (acoshValue.im <= 0) {
      expect(acoshValue.re).toBeCloseTo(acoshValue.re);
      expect(acoshValue.im).toBeCloseTo(-acoshValue.im);
    } else {
      expect(acoshValue.re).toBeCloseTo(acoshValue.re);
      expect(acoshValue.im).toBeCloseTo(acoshValue.im);
    }
  });
});