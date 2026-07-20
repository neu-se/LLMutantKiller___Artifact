import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypot correctly for different input values', () => {
    const complex = new Complex(3000, 1);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000*3000 + 1*1));
  });
});