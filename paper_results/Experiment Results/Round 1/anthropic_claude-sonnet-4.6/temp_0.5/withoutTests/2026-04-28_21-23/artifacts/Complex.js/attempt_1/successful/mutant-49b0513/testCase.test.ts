import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number", () => {
    // atanh(0.5 + 0.5i) should give a specific result
    // The mutation changes `var temp = x['re']` to `var temp = x[""]`
    // which means temp will be undefined, causing incorrect computation
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Known value: atanh(0.5 + 0.5i)
    // re ≈ 0.4023594781085251
    // im ≈ 0.5535743588970452
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});