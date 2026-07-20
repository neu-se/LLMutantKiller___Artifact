import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return a valid (non-NaN) imaginary part for acosh of a negative imaginary number", () => {
    // For z = 0 - 2i, acos(z).im > 0, triggering the else branch in acosh
    // In the mutated code: res['im'] = -res[""] = -undefined = NaN
    // In the original code: res['im'] = -res['re'] (a valid finite number)
    const z = new Complex(0, -2);
    const result = z.acosh();

    // The imaginary part must be a finite number, not NaN
    expect(isNaN(result.im)).toBe(false);
    expect(isFinite(result.im)).toBe(true);

    // Verify the imaginary part has the correct sign and magnitude
    // acosh(-2i) should have im = pi/2 ≈ 1.5708
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});