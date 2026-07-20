import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the hyperbolic sine of a large negative value', () => {
    const x = -100;
    const complexSinhX = new Complex(x, 0).sinh();
    expect(complexSinhX.re).toBeCloseTo(-Math.sinh(100), 5);
    expect(complexSinhX.im).toBeCloseTo(0, 5);
  });
});