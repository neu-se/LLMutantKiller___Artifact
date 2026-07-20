import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for numbers where a is greater than 3000 and b is less than 3000', () => {
    const complex = new Complex(3001, 1000);
    const result = complex.abs();
    const originalResult = Math.sqrt(3001**2 + 1000**2);
    expect(result).toBeCloseTo(originalResult, 10);
  });
});