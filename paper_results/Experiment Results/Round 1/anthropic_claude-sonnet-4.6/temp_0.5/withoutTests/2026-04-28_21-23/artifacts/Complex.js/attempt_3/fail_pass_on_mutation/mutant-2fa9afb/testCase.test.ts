import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should return non-zero result for sinh(1)", () => {
    // sinh(1) should be approximately 1.1752, not zero
    // The mutation changes `if (a === 0 && b === 0)` to `if (true)` in sinh,
    // causing sinh to always return ZERO
    const c = new Complex(1, 0);
    const result = c.sinh();
    
    expect(result.re).toBeCloseTo(Math.sinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});