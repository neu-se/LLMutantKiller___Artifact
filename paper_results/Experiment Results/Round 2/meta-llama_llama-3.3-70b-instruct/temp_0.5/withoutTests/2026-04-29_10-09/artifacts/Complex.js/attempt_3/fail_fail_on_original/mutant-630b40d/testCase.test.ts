import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3;
    const b = 4;
    const complex = new Complex(a, b);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(a * a + b * b));
    const mutatedComplex = new Complex(a, b);
    expect(mutatedComplex.abs()).not.toBeCloseTo(a / Math.sqrt(1 + b * b));
  });
});