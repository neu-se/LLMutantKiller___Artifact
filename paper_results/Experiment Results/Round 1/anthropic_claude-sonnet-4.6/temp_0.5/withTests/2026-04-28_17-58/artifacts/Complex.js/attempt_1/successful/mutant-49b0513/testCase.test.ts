import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with both real and imaginary parts", () => {
    // atanh(0.5 + 0.5i) should produce a specific result
    // The mutation changes `var temp = x['re']` to `var temp = x[""]`
    // which means temp will be undefined, causing Math.atan2 to use undefined
    // instead of the real part, producing NaN for the imaginary part
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();

    // Expected values for atanh(0.5 + 0.5i)
    // Re(atanh(0.5 + 0.5i)) ≈ 0.4023594781085251
    // Im(atanh(0.5 + 0.5i)) ≈ 0.5535743588970452
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});