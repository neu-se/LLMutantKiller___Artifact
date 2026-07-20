import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should not return NaN for acsc(0)", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    
    // Original: returns Complex(PI/2, Infinity) - not NaN
    // Mutated: if(false) skips early return, d=0, a=0, b=0
    // goes to: new Complex(0, 0).asin() 
    // Check that result is finite/infinite but not NaN
    expect(result.isNaN()).toBe(false);
    // And specifically the real part should be PI/2
    expect(Math.abs(result.re - Math.PI / 2) < 0.001).toBe(true);
  });
});