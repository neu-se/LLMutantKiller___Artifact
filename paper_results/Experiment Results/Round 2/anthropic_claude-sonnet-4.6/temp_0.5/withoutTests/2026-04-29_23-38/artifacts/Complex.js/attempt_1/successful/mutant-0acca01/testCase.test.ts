import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero d", () => {
    // For acoth, the formula is: acoth(c) = log((c+1) / (c-1)) / 2
    // The mutation changes `a / d` to `a * d` in the new Complex(a/d, -b/d).atanh() call
    // We need a case where d !== 0 so the first branch is taken
    
    // Use a simple real number: acoth(2) = atanh(1/2) = 0.5 * log(3)
    const c = new Complex(2, 0);
    const result = c.acoth();
    
    // acoth(2) = 0.5 * ln(3) ≈ 0.5493061443340548
    const expected = 0.5 * Math.log(3);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});