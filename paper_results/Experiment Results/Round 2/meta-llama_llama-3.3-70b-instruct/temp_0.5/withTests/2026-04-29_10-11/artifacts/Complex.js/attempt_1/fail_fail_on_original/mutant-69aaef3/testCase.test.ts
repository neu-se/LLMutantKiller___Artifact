import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const a = 3;
    const b = 4;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(5);
  });
});