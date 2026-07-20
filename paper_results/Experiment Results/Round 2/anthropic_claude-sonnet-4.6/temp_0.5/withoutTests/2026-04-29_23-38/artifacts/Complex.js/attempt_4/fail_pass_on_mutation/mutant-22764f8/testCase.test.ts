import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should return correct real part for asec(2) matching acos(0.5)", () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    
    // With mutation a=undefined, d=NaN, a/d=NaN -> acos(NaN,0) -> NaN result
    // Original: a=2, d=4, a/d=0.5, b/d=0 -> acos(0.5, 0) = PI/3
    const correctValue = new Complex(0.5, 0).acos();
    
    expect(result.re).toBe(correctValue.re);
    expect(result.im).toBe(correctValue.im);
  });
});