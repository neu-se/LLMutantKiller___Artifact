import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for hypot function when a is less than b', () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5, 10);
  });
});