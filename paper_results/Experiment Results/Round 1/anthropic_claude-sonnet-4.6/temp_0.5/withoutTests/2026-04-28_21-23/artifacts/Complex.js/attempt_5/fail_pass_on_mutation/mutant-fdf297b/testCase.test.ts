import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting finite from Infinity (not NaN)", () => {
    // If original first check is && (NaN only when both infinite),
    // then Infinity - finite falls through to second check (||) → Infinity
    // If mutated first check is || (NaN when either infinite),
    // then Infinity - finite returns NaN
    
    const result = Complex.INFINITY.sub(new Complex(1, 0));
    expect(result.isInfinite()).toBe(true);
  });
});