import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex1 = new Complex(3001, 0);
    const complex2 = new Complex(0, 3001);
    const result1 = complex1.abs();
    const result2 = complex2.abs();
    expect(result1).toBeCloseTo(3001);
    expect(result2).toBeCloseTo(3001);
  });
});