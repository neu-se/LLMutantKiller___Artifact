import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3001, 0);
    const result = complex.abs();
    expect(result).toBeCloseTo(3001);
  });
});