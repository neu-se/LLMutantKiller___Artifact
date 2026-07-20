import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs overflow in hypot", () => {
  it("should not overflow when |im| >> |re| with large values", () => {
    // x = 3001 (re), y = 1e200 (im)
    // a = 3001, b = 1e200, so a < b
    // ORIGINAL (a<b branch): a = 1e200, b = 3001/1e200 ≈ 0, result = 1e200 * sqrt(1+~0) ≈ 1e200 ✓
    // MUTATED (else branch): b = 1e200/3001 ≈ 3.33e196, b*b overflows to Infinity, result = Infinity ✗
    const c = new Complex(3001, 1e200);
    const absValue = c.abs();
    expect(isFinite(absValue)).toBe(true);
    expect(absValue).toBeCloseTo(1e200, -195);
  });
});