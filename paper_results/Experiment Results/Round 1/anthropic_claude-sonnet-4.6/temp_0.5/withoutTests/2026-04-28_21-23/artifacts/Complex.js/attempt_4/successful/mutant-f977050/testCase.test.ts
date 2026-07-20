import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return correct imaginary part for acosh of a negative imaginary number", () => {
    // For z = 0 - 2i, acos(z).im > 0, triggering the else branch in acosh
    // In the mutated code: res['im'] = -res[""] = -undefined = NaN
    // In the original code: res['im'] = -res['re'] (a valid finite number)
    const z = new Complex(0, -2);
    const result = z.acosh();

    // The imaginary part must be a finite number, not NaN
    // Original gives im = -pi/2, mutated gives im = NaN
    expect(isNaN(result.im)).toBe(false);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});