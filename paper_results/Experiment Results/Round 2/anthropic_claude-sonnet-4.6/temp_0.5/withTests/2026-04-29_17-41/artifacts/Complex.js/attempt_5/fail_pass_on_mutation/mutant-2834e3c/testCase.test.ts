import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("detects mutation using Number.MIN_VALUE where d definitely underflows", () => {
    const tiny = Number.MIN_VALUE; // 5e-324, smallest positive double
    const d = tiny * tiny + tiny * tiny;
    expect(d).toBe(0); // Must underflow
    
    const z = new Complex(tiny, tiny);
    expect(z.isZero()).toBe(false);
    
    const result = z.asech();
    // Original: new Complex(0, -Infinity).acosh() -> NaN (0*Inf = NaN in acos)
    // Mutated:  new Complex(0, 0).acosh() -> Complex(0, pi/2)
    expect(isNaN(result.re) || isNaN(result.im)).toBe(true);
  });
});