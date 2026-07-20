import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // For z = 1 + i, acsch should return a finite complex number
    // The mutation flips (d !== 0) to (d === 0), causing the wrong branch to execute
    // when d != 0 (the normal case), resulting in Infinity instead of a finite value
    const z = new Complex(1, 1);
    const result = z.acsch();

    // The result should be finite (not Infinity or NaN)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);

    // Verify the actual computed value matches expected
    // acsch(1+i) should have specific real and imaginary parts
    // Using the identity: acsch(z) = asinh(1/z)
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i) ≈ 0.5306... - 0.4522...i
    expect(result.re).toBeCloseTo(0.5306375309525178, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});