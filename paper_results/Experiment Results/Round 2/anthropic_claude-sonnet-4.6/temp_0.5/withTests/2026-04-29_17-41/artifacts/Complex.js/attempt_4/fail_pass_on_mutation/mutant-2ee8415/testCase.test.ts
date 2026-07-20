import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a purely imaginary number 2i", () => {
    // For z = 2i, acos(2i) has re < 0 and im > 0, triggering the else branch
    // Original: re = old_im (positive), im = -old_re (positive)
    // Mutated: re stays as old_re (negative), im = -old_re (positive)
    const result = new Complex(0, 2).acosh();
    
    // The real part should be positive (≈ 1.4436354751788103)
    expect(result.re).toBeGreaterThan(0);
    expect(result.re).toBeCloseTo(1.4436354751788103, 10);
  });
});