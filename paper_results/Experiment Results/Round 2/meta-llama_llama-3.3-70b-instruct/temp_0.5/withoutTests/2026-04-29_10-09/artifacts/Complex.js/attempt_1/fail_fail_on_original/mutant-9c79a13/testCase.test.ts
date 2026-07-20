import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * cosh(1) * Math.cos(1) / (Math.cos(2 * 1) + cosh(2 * 1)));
    expect(result.im).toBeCloseTo(-2 * sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + cosh(2 * 1)));
  });
});