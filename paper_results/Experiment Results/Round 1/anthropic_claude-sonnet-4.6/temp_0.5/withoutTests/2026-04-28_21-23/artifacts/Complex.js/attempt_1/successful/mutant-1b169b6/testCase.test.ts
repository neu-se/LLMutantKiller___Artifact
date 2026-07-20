import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a non-zero complex number with non-zero magnitude", () => {
    // For acoth(2), the result should be atanh(1/2) = 0.5 * log(3) ≈ 0.5493...
    // When d !== 0, the original code returns new Complex(a/d, -b/d).atanh()
    // When mutated to (false), it falls through to the else branch with division by zero
    const c = new Complex(2, 0);
    const result = c.acoth();
    
    // acoth(2) = atanh(1/2) ≈ 0.5493061443340548
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});