import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a non-zero complex number with non-zero magnitude", () => {
    // acoth(2) = atanh(1/2) = 0.5 * log((1 + 0.5) / (1 - 0.5)) = 0.5 * log(3) ≈ 0.5493...
    const c = new Complex(2, 0);
    const result = c.acoth();
    
    // The original code returns (d !== 0) ? new Complex(a/d, -b/d).atanh() : ...
    // For c = 2+0i, d = 4, so it should return new Complex(0.5, 0).atanh()
    // atanh(0.5) ≈ 0.5493061443340549
    expect(result.re).toBeCloseTo(0.5493061443340549, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});