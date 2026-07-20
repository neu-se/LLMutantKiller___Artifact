import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when only one operand is infinite in subtraction", () => {
    // Original (&&): first check (false && true) skips, second || check => Infinity
    // Mutated (||): first check (false || true) triggers => NaN
    const result = new Complex(5, 3).sub(Complex.INFINITY);
    
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});