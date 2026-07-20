import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(2999, 2999);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(2999 * 2999 + 2999 * 2999), 10);
  });
});