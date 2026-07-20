import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute cosh for a real number", () => {
    // cosh(1) = (e^1 + e^-1) / 2 ≈ 1.5430806348152437
    const c = new Complex(1, 0);
    const result = c.cosh();
    
    // With the original code, cosh(1) ≈ 1.5430806348152437
    // With the mutated code, cosh returns undefined, so the result would be NaN
    expect(result.re).toBeCloseTo(Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});