import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex coth method", () => {
  it("should correctly compute coth for real input z=1", () => {
    // coth(1) = cosh(2)/sinh(2) + correction
    // coth uses: sinh(a)/d where d = cosh(a) - cos(b), a=2*re, b=2*im
    // For z=1: a=2, b=0, d = cosh(2) - 1
    // re = sinh(2) / (cosh(2) - 1)
    // original: sinh(2) ≈ 3.6268, result ≈ 1/tanh(1) ≈ 1.3130
    // mutated: sinh(2) = (e^2-e^-2)/0.5 ≈ 14.507, result ≈ 5.252 (4x too large)
    const c = new Complex(1, 0);
    const result = c.coth();
    const expected = 1 / Math.tanh(1); // ≈ 1.3130352854993315
    expect(result.re).toBeCloseTo(expected, 8);
    expect(result.im).toBeCloseTo(0, 10);
  });
});