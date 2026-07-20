import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with zero real and negative imaginary from cot computation", () => {
    // cot(0 + i) has re = -sin(0)/d = -0/d which might be -0
    // This tests the path where a=0 (after epsilon) and b<0
    const c = new Complex(0, 1).cot();
    expect(c.re).toBeCloseTo(0, 10);
    expect(c.im).toBeLessThan(0);
    const str = c.toString();
    // Should be negative imaginary only, like "-1.313...i"
    expect(str).toMatch(/^-[\d.]+i$/);
  });
});