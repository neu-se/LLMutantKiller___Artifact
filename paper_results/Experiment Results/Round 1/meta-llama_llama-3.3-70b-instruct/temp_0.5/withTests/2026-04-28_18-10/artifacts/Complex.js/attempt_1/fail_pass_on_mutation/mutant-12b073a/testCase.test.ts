import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the hyperbolic sine of a complex number', () => {
    const c = new Complex(1, 1);
    const sinhC = c.sinh();
    expect(sinhC.re).toBeCloseTo(Math.sinh(1) * Math.cos(1));
    expect(sinhC.im).toBeCloseTo(Math.cosh(1) * Math.sin(1));
  });
});