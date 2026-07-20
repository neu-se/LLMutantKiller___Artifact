import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    const expectedRe = Math.cos(1) * Math.cosh(1) / (Math.cos(1) * Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(Math.sin(1) * Math.sinh(1) / (Math.cos(1) * Math.cosh(1)));
  });
});