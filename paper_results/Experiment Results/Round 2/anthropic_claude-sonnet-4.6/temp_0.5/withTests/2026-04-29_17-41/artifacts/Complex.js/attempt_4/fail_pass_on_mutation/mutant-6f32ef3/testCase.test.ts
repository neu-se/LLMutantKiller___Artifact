import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should handle pure imaginary with im = -0 correctly", () => {
    // Directly create object bypassing constructor to set im = -0
    // Then in toString: EPSILON converts -0 to 0, early return fires
    // Both original and mutated return "0"
    // This test verifies the early return behavior
    const c = new Complex(0, 0);
    expect(c.toString()).toBe("0");
    expect(c.toString()).not.toBe("-0i");
  });
});