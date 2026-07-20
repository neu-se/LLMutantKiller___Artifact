import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(1e-16, 0);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0);
    const originalComplex = new Complex(1e-16, 0);
    const originalResult = originalComplex.asech();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.asech();
    expect(result.re).not.toBeCloseTo(result2.re);
  });
});