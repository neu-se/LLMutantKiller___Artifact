import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for hypot function when a is less than b', () => {
    const a = 1;
    const b = 2;
    const result = Complex.prototype.abs(new Complex(a, b));
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});