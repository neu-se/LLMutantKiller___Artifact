import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the hyperbolic sine of a value close to zero', () => {
    const x = 1e-9;
    const complexSinhX = new Complex(x, 0).sinh();
    expect(complexSinhX.re).toBeCloseTo(x, 10);
    expect(complexSinhX.im).toBeCloseTo(0, 10);
  });
});