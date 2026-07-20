import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth mutation test', () => {
  it('should correctly compute acoth(2) as atanh(0.5)', () => {
    // acoth(2) = atanh(1/2) ≈ 0.5493061443340548
    // Original code: creates Complex(a/d, -b/d) = Complex(2/4, 0) = Complex(0.5, 0), then atanh
    // Mutated code: creates Complex(a*d, -b/d) = Complex(2*4, 0) = Complex(8, 0), then atanh
    // These produce very different results
    const result = new Complex(2, 0).acoth();
    const expected = Math.atanh(0.5); // ≈ 0.5493061443340548
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});