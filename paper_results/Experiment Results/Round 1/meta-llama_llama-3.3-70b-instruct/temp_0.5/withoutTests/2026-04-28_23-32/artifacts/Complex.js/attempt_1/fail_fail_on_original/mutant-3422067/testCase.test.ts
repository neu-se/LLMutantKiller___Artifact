import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3000, 3001);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000 * 3000 + 3001 * 3001));
  });
});