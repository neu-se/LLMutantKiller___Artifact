import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the hyperbolic sine of a value close to zero with high precision', () => {
    const x = 1e-20;
    const complexSinhX = new Complex(x, 0).sinh();
    expect(complexSinhX.re).toBeCloseTo(x, 20);
    expect(complexSinhX.im).toBeCloseTo(0, 20);
  });
});