import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting finite from Infinity (only one operand is infinite)", () => {
    // Infinity - finite:
    // Original: first check is ||, (true || false) => returns NaN
    // Mutated: first check is &&, (true && false) => skips, second check || => returns Infinity
    const result = Complex.INFINITY.sub(new Complex(3, 4));
    
    expect(result.isInfinite()).toBe(false);
    expect(result.isNaN()).toBe(true);
  });
});