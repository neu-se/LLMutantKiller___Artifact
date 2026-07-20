import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly for large values', () => {
    const complex = new Complex(3001, 3001);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3001 * 3001 + 3001 * 3001), 10);
  });
});