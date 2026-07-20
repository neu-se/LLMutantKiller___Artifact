import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the secant correctly', () => {
    const c = new Complex(1, 2);
    const sec = c.sec();
    const expected = new Complex(
      Math.cos(c.re) * cosh(c.im) / (0.5 * cosh(2 * c.im) + 0.5 * Math.cos(2 * c.re)),
      Math.sin(c.re) * sinh(c.im) / (0.5 * cosh(2 * c.im) + 0.5 * Math.cos(2 * c.re))
    );
    expect(sec.re).toBeCloseTo(expected.re, 10);
    expect(sec.im).toBeCloseTo(expected.im, 10);
  });
});