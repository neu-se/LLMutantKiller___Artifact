import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for hypot function when a is greater than b', () => {
    const complex1 = new Complex(3001, 1);
    const complex2 = new Complex(1, 3001);
    const result1 = complex1.abs();
    const result2 = complex2.abs();
    expect(result1).not.toBeCloseTo(result2, 10);
  });
});