import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting finite from Infinity", () => {
    // Original: first check is &&, skips; second check is || => returns Infinity
    // Mutated: first check is ||, triggers => returns NaN
    const result = Complex.INFINITY.sub(new Complex(3, 4));
    
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});