import { Complex } from "../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for hypot function when a is less than b', () => {
    const result = new Complex(3, 4).abs();
    expect(result).toBeCloseTo(5, 10);
  });
});