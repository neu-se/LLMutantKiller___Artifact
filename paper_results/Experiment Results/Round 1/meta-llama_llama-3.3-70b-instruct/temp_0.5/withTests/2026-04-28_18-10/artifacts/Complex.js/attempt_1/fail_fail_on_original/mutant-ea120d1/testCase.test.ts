import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.abs();
    expect(result).toBeCloseTo(4242.6407, 4);
  });
});