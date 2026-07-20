import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(-2) with correct real part", () => {
    // For acosh(-2), acos(-2).im should be positive, triggering the else branch
    // Original: re = old_im, im = -old_re
    // Mutated: re stays unchanged (wrong value), im = -old_re
    const acos_result = new Complex(-2, 0).acos();
    // Verify else branch is taken
    expect(acos_result.im).toBeGreaterThan(0);
    
    const result = new Complex(-2, 0).acosh();
    // In original: result.re = acos_result.im
    expect(result.re).toBeCloseTo(acos_result.im, 10);
    // In mutated: result.re = acos_result.re (unchanged), which differs
    expect(result.re).not.toBeCloseTo(acos_result.re, 5);
  });
});