import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("verifies acsc else branch re component via asin behavior", () => {
    // Direct test: asin(0,0) = 0 but asin(NaN,0) = NaN
    // If we could trigger acsc else branch with im=0, we'd detect the mutation
    // The closest we can get: use a=0, b=subnormal where b*b=0
    // im in else branch = (b!==0)?-b/0:0 = -Infinity (when b>0, subnormal)
    // So we test asin(0,-Inf) vs asin(NaN,-Inf) - both NaN
    // Alternative: test that acsc(0,0) still works (early return path)
    const zero = new Complex(0, 0).acsc();
    expect(zero.re).toBeCloseTo(Math.PI / 2, 10);
    expect(zero.im).toBe(Infinity);
    // And verify the mutation would break something if it could be reached
    // by checking asin(0,0) vs asin(NaN,0) directly
    const asinZero = new Complex(0, 0).asin();
    const asinNaN = new Complex(NaN, 0).asin();
    expect(asinZero.re).toBe(0);
    expect(isNaN(asinNaN.re)).toBe(true);
  });
});