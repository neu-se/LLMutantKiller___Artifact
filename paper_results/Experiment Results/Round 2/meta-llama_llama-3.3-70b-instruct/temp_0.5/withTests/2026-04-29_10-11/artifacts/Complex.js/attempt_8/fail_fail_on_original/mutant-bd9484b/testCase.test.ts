import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex(1, 0);
    const acosh = c.acosh();
    const expected = new Complex(0, Math.PI / 2);
    if (acosh.im <= 0) {
      expect(acosh.re).toBeCloseTo(expected.re, 5);
      expect(acosh.im).toBeCloseTo(expected.im, 5);
    } else {
      expect(acosh.re).toBeCloseTo(-expected.re, 5);
      expect(acosh.im).toBeCloseTo(-expected.im, 5);
    }
  });
});