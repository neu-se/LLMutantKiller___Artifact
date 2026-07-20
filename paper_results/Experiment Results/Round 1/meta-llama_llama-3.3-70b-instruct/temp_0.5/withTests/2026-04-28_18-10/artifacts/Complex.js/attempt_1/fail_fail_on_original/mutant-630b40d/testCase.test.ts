import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3;
    const b = 4;
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(5, 10);
  });
});