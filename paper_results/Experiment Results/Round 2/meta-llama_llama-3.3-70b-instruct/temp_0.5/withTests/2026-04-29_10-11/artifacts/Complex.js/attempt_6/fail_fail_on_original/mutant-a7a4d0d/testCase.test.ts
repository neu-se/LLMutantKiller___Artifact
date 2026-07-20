import { Complex } from "../../../../complex.js";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(1, 1);
    const acoshValue = complex.acosh();
    const res = new Complex(acoshValue.re, acoshValue.im);
    if (res.im <= 0) {
      expect(res.re).toBeCloseTo(acoshValue.re);
      expect(res.im).toBeCloseTo(-acoshValue.im);
    } else {
      expect(res.re).toBeCloseTo(acoshValue.re);
      expect(res.im).toBeCloseTo(acoshValue.im);
    }
  });
});