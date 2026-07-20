import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const c1 = new Complex(3000, 3000);
    const c2 = new Complex(3001, 3000);
    const result1 = c1.abs();
    const result2 = c2.abs();
    expect(result1).not.toBeCloseTo(result2, 10);
  });
});