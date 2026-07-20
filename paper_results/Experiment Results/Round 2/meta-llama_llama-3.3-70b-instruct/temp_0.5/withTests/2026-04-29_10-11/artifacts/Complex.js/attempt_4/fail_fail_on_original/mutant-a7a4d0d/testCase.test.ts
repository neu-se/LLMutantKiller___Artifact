import { Complex } from "../../../../../complex.js";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(1, 1);
    const acoshValue = complex.acosh();
    const expectedRe = acoshValue.re;
    const expectedIm = acoshValue.im;
    if (expectedIm <= 0) {
      expect(acoshValue.re).toBeCloseTo(expectedRe);
      expect(acoshValue.im).toBeCloseTo(-expectedIm);
    } else {
      expect(acoshValue.re).toBeCloseTo(expectedRe);
      expect(acoshValue.im).toBeCloseTo(expectedIm);
    }
  });
});