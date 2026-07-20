import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot overflow behavior in abs()", () => {
  it("should correctly compute abs() for large real part with small imaginary part without overflow", () => {
    // With a = 1e200 (>= 3000) and b = 0 (< 3000):
    // Original: takes overflow-safe path because a >= 3000, returns 1e200
    // Mutated: takes simple sqrt path because condition is (true && b < 3000),
    //          computes Math.sqrt(1e200 * 1e200 + 0) = Math.sqrt(Infinity) = Infinity
    const c = new Complex(1e200, 0);
    const result = c.abs();
    expect(result).toBe(1e200);
    expect(isFinite(result)).toBe(true);
  });
});