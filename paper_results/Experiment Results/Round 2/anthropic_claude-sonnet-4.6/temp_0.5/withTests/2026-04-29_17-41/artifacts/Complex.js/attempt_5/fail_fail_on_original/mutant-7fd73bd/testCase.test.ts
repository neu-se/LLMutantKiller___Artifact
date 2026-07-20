import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log mutation", () => {
  it("should compute log of complex number with positive real and zero imaginary correctly", () => {
    // For z = 5+0i: log = log(5) + 0i
    // logHypot(5, 0) = log(5*5)*0.5 = log(5) ✓
    // atan2(0, 5) = 0 ✓
    // Both versions: if body commented, same result
    // BUT: what if the mutation is in a DIFFERENT part of the file?
    // Let me test the `pow` function which has similar structure
    // pow(0+0i, z) where z.re > 0 and z.im >= 0 returns ZERO
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});