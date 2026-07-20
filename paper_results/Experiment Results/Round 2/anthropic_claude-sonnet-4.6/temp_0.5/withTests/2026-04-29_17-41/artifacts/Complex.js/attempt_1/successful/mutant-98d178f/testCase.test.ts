import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation test", () => {
  it("should compute atanh of a complex number with correct imaginary part", () => {
    // atanh(2 + i) should have a well-defined imaginary part
    // The mutation changes x['im'] to x[""] (undefined) in Math.atan2,
    // causing the imaginary part to become NaN instead of the correct value
    const z = new Complex(2, 1);
    const result = z.atanh();

    // The result should be a finite complex number, not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);

    // Verify the actual values match expected atanh(2+i)
    // atanh(2+i) ≈ 0.4023594781085251 + 1.3389725222944935i
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(1.3389725222944935, 10);
  });
});