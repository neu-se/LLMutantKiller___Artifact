import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3001, 0);
    const result = complex.abs();
    expect(result).toBeCloseTo(3001);
    const complex2 = new Complex(0, 3001);
    const result2 = complex2.abs();
    expect(result2).toBeCloseTo(3001);
    const complex3 = new Complex(3000, 3000);
    const result3 = complex3.abs();
    expect(result3).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});