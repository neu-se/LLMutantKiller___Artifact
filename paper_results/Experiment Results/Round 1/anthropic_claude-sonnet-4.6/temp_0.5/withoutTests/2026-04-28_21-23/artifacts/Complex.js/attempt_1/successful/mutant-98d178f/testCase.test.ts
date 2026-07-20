import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should have a specific imaginary part
    // The mutation changes x['im'] to x[''] which would be undefined,
    // causing Math.atan2(undefined, temp) to return NaN instead of the correct value
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected: atanh(0.5 + 0.5i)
    // Re = logHypot(...) / 2, Im = atan2(im, temp) / 2
    // The imaginary part should be a finite, non-NaN number
    expect(isNaN(result.im)).toBe(false);
    expect(isFinite(result.im)).toBe(true);
    
    // More specifically, verify the actual value
    // atanh(0.5 + 0.5i) ≈ 0.4023594781... + 0.5535743588...i
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
  });
});