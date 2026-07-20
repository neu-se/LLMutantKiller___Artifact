import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the hyperbolic sine of a large value', () => {
    const x = 10;
    const sinhX = Math.sinh(x);
    const complexSinhX = new Complex(x, 0).sinh();
    expect(complexSinhX.re).toBeCloseTo(sinhX, 5);
    expect(complexSinhX.im).toBeCloseTo(0, 5);
  });
});