import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("detects mutation in acot d=0 branch using subnormal b where b*b underflows", () => {
    const tinyB = 5e-324;
    expect(tinyB * tinyB).toBe(0); // confirm underflow
    
    const c = new Complex(0, tinyB);
    const result = c.acot();
    
    // Original: d=0, b !== 0 is true, so imaginary = -tinyB/0 = -Infinity
    // new Complex(0, -Infinity).atan() produces NaN
    // Mutated: (false), so imaginary = 0, new Complex(0,0).atan() = Complex(0,0)
    expect(result.isNaN()).toBe(true);
  });
});