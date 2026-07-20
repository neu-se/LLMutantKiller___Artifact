import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const result = Complex.hypot(3000, 1);
    expect(result).toBeCloseTo(3000 * Math.sqrt(1 + 1 * 1));
  });
});