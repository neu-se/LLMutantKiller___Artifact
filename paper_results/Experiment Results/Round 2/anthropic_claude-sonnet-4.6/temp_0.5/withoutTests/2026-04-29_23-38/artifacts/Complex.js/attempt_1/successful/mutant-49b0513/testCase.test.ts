import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number", () => {
    // atanh(0.5 + 0.5i) should produce a specific complex result
    // The mutation changes `var temp = x['re']` to `var temp = x[""]` (undefined)
    // This will cause Math.atan2(x['im'], temp) to use undefined instead of x['re']
    // resulting in incorrect imaginary part of the result
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected values computed from the formula for atanh
    // atanh(0.5 + 0.5i) ≈ 0.4023594781085251 + 0.5535743588970453i
    const expectedRe = 0.4023594781085251;
    const expectedIm = 0.5535743588970453;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});