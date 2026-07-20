import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting Infinity from a finite complex number", () => {
    // finite - Infinity:
    // Original: first check is ||, so (false || true) => returns NaN
    // Mutated: first check is &&, so (false && true) => skips, second check is || => returns Infinity
    const finite = new Complex(3, 4);
    const result = finite.sub(Complex.INFINITY);
    
    expect(result.isNaN()).toBe(true);
    expect(result.isInfinite()).toBe(false);
  });
});