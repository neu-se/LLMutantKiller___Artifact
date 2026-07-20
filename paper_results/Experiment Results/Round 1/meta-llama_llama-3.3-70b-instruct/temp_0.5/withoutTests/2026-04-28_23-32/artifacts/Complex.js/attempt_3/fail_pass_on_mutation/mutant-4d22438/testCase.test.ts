import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypot correctly for different input values', () => {
    const result = Math.hypot(3, 4);
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(result);
  });
});