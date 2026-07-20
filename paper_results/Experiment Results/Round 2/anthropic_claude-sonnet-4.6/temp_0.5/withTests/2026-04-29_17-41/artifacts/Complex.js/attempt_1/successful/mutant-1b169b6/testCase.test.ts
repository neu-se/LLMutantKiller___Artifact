import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a non-zero complex number with non-zero magnitude", () => {
    // For acoth(2), the result should be atanh(1/2) = 0.5 * log(3) ≈ 0.5493...
    // With the mutation (d !== 0) becomes (false), it will always take the else branch
    // which computes (a !== 0) ? a / 0 : 0 = Infinity, giving wrong result
    const z = new Complex(2, 0);
    const result = z.acoth();
    
    // acoth(2) = atanh(1/2) = 0.5 * ln(3) ≈ 0.5493061443340548
    const expected = Math.log(3) / 2;
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});