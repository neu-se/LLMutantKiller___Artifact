import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number", () => {
    // atanh(0.5 + 0.5i) should produce a specific result
    // The mutation changes `var temp = x['re']` to `var temp = x[""]`
    // This means temp will be undefined, causing Math.atan2 to produce NaN
    // and the result will be incorrect
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected values for atanh(0.5 + 0.5i)
    // Re(atanh(0.5+0.5i)) ≈ 0.4023594781085251
    // Im(atanh(0.5+0.5i)) ≈ 0.5535743588970452
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});