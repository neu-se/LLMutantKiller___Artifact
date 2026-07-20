import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the secant correctly', () => {
    const inputs = [
      new Complex(0, 0),
      new Complex(1, 0),
      new Complex(0, 1),
      new Complex(1, 1),
    ];

    inputs.forEach((c) => {
      const sec = c.sec();
      const expected = new Complex(
        Math.cos(c.re) * Math.cosh(c.im) / (0.5 * Math.cosh(2 * c.im) + 0.5 * Math.cos(2 * c.re)),
        Math.sin(c.re) * Math.sinh(c.im) / (0.5 * Math.cosh(2 * c.im) + 0.5 * Math.cos(2 * c.re))
      );
      expect(sec.re).toBeCloseTo(expected.re, 3);
      expect(sec.im).toBeCloseTo(expected.im, 3);
    });
  });
});