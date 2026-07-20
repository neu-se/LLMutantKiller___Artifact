import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return a non-NaN result for asech of a complex number with non-zero imaginary part", () => {
    // With mutation: b = this[""] = undefined
    // d = a*a + b*b = a*a + NaN = NaN
    // Then new Complex(a/d, -b/d) = new Complex(NaN, NaN)
    // So acosh(NaN) returns NaN
    // With original: b = this['im'] = 1 (non-zero), computation is valid
    const c = new Complex(0, 1);
    const result = c.asech();
    
    // The result should not be NaN in the original code
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});