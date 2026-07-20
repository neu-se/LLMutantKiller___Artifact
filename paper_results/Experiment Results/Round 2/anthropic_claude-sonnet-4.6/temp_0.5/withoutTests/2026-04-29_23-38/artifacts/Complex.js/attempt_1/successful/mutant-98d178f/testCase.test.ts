import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should have a specific imaginary part
    // The mutation changes x['im'] = Math.atan2(x['im'], temp) / 2
    // to x['im'] = Math.atan2(x[""], temp) / 2
    // x[""] is undefined, so atan2(undefined, temp) = atan2(NaN, temp) = NaN
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // The real part should be approximately 0.4023594781085251
    // The imaginary part should be approximately 0.5535743588970452
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
    expect(isNaN(result.im)).toBe(false);
  });
});