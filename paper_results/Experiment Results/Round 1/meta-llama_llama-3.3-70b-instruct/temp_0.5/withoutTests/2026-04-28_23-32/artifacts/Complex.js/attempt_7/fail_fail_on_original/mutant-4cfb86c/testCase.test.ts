import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for acot when a is not zero and b is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});