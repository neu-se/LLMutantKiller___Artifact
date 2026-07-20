import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan of (0, -1) should have im equal to -Infinity", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Both original and mutant give Complex(0, -Infinity)
    // But check if isInfinite() differs based on re value
    expect(result.im).toBe(-Infinity);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
    // The real part in original is exactly 0 (from constructor)
    // In mutant it's -0.5 * 0 = -0
    // Verify via division: 1/re should be +Infinity for +0
    expect(result.re).toBe(0);
    expect(isFinite(result.re)).toBe(true);
    // Key difference: original has re=0 (positive zero), mutant has re=-0
    // But since -0 === 0, we use a workaround
    const reSign = result.re === 0 ? (1/result.re > 0 ? '+0' : '-0') : 'nonzero';
    expect(reSign).toBe('+0');
  });
});