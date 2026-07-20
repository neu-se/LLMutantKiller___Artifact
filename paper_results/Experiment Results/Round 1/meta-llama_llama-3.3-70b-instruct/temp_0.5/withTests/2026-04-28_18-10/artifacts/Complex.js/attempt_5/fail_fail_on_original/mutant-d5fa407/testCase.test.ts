import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(Math.PI / 2, 5);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(-0, 5);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 5);
  });
});