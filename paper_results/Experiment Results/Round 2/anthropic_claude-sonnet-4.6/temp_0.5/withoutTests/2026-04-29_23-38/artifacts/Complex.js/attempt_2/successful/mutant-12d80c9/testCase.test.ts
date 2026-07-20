import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("asech fallback branch: real part is Infinity when a is nonzero and d is zero", () => {
    // 1e-200 squared underflows to 0 in IEEE 754 double precision
    const a = 1e-200;
    expect(a * a).toBe(0); // Verify underflow
    
    const c = new Complex(a, 0);
    expect(c.isZero()).toBe(false); // a != 0, so not zero
    
    // With d = a*a = 0 and isZero() = false, we enter the d === 0 fallback
    // Original: new Complex((a !== 0) ? a/0 : 0, 0).acosh()
    //         = new Complex(Infinity, 0).acosh()
    // Mutated:  new Complex((false) ? a/0 : 0, 0).acosh()
    //         = new Complex(0, 0).acosh()
    //
    // acosh(Infinity, 0) involves NaN (from -2*Infinity*0 in acos), giving NaN
    // acosh(0, 0) = Complex(-0, PI/2)
    //
    // So original.re = NaN, mutated.re = -0
    const result = c.asech();
    expect(isNaN(result.re)).toBe(true);
  });
});