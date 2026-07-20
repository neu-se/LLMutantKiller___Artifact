import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should return correct result when raising a real positive number to a real power", () => {
    // 2^3 = 8, not zero
    // In original: condition (a===0 && b===0) is false for a=2, b=0, so continues to compute
    // In mutated: condition is always true, returns ZERO immediately
    const base = new Complex(2, 0);
    const result = base.pow(new Complex(3, 0));
    
    expect(result.re).toBeCloseTo(8, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});