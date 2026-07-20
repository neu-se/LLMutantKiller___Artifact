import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const complex = new Complex(3001, 3000);
    const result = complex.abs();
    const originalResult = Math.sqrt(3001**2 + 3000**2);

    expect(result).toBeCloseTo(originalResult, 10);
  });
});