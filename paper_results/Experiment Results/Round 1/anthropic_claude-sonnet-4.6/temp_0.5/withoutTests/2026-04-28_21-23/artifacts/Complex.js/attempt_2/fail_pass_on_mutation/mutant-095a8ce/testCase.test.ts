import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return Complex(PI/2, Infinity) when called on zero (0 + 0i)", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    
    // Original: early return gives Complex(PI/2, Infinity)
    // Mutated: falls through, d=0, computes Complex(0/0, 0/0).asin() = NaN
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});