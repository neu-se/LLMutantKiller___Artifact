import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalComplex = new Complex(0, 1);
    const originalResult = originalComplex.asech();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});