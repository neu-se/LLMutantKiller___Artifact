import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypot correctly for different input values', () => {
    const complex = new Complex(1, 3000);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(1*1 + 3000*3000));
  });
});