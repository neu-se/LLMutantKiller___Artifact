import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // For z = 1 + i:
    // Original: d = a*a + b*b = 1 + 1 = 2, so we compute (0.5 - 0.5i).asinh()
    // Mutated:  d = a*a - b*b = 1 - 1 = 0, leading to division by zero / Infinity
    const z = new Complex(1, 1);
    const result = z.acsch();

    // The result should be finite and well-defined
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);

    // Verify the actual value: acsch(1+i) should be approximately 0.5306... - 0.4522...i
    // We can verify by checking that sinh(acsch(z)) ≈ z
    const sinh_result = result.sinh();
    expect(sinh_result.re).toBeCloseTo(1, 10);
    expect(sinh_result.im).toBeCloseTo(1, 10);
  });
});