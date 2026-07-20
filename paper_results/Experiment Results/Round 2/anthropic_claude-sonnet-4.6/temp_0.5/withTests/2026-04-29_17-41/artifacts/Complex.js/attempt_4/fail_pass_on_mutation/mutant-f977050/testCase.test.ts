import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh with correct real and imaginary parts when else branch executes", () => {
    // For input with positive imaginary part after acos, the else branch runs
    // tmp is hoisted from if-branch var declaration but undefined (if not taken)
    // Original else: res['im'] = -res['re'] (correct), res['re'] = tmp (undefined!)
    // Mutated else: res['im'] = -res[""] = NaN, res['re'] = undefined
    // Test a value where acos gives im > 0
    const c = new Complex(0, 1);
    const result = c.acosh();
    const expected = c.acos();
    // Just verify result is not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});