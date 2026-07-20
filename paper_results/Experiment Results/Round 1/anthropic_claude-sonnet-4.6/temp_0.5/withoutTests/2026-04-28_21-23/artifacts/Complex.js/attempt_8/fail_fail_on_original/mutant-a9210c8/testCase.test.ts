import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech with real input", () => {
  it("sech(2) should equal 1/cosh(2)", () => {
    // For real z=2: sech(2) = 1/cosh(2), im=0
    // With mutation b=undefined: d=NaN, result=NaN  
    // With original b=0: d=cos(0)+cosh(4)=1+cosh(4), result is real
    const result = new Complex(2, 0).sech();
    const expected = 1 / Math.cosh(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
  });
});