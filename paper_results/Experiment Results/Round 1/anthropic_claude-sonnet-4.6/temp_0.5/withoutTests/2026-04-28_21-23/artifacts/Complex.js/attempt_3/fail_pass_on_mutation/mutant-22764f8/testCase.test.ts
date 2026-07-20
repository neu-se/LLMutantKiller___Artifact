import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should return Infinity imaginary part for asec(0)", () => {
    // When a=0 and b=0, asec should return Complex(0, Infinity)
    // With mutation var a = this[""] => a is undefined, so a===0 check fails
    const c = new Complex(0, 0);
    const result = c.asec();
    
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});