import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method - Infinity minus finite number", () => {
  it("should return Infinity when subtracting a finite number from Infinity", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.sub(finite);
    
    // In the original code: only Infinity - Infinity = NaN
    // Infinity - finite = Infinity
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});