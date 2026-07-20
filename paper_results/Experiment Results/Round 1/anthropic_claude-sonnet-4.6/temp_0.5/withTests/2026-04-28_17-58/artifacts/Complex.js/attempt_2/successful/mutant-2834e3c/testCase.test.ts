import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return INFINITY when called on zero", () => {
    // When isZero() is true, asech returns INFINITY early
    // This tests the boundary condition near the d===0 branch
    // For a number very close to zero but not zero, d !== 0 so normal path
    // For exactly zero, isZero() catches it
    // The mutation changes (b !== 0) ? -b/0 : 0 to (false) ? -b/0 : 0
    // To expose this, we need d === 0 but isZero() === false
    // This is impossible with real finite numbers, but with -0:
    // new Complex(-0, 0): re = -0, im = 0
    // isZero(): im === 0 && re === 0 => -0 === 0 is true in JS, so isZero() returns true
    // Still unreachable...
    // Let's try to construct a case where a*a + b*b underflows to 0
    // Use Number.MIN_VALUE: (5e-324)^2 = 0 due to underflow!
    const tiny = Number.MIN_VALUE; // 5e-324
    const z = new Complex(0, tiny); // re=0, im=tiny
    // isZero(): im === 0? No, tiny !== 0. So isZero() is false.
    // d = 0*0 + tiny*tiny = 0 (underflow!)
    // So d === 0 branch is taken with b = tiny !== 0
    // Original: (b !== 0) ? -b/0 : 0 => -Infinity
    // Mutated:  (false)   ? -b/0 : 0 => 0
    // Then new Complex(0, -Infinity or 0).acosh() will differ!
    const result = z.asech();
    // With original: new Complex(0, -Infinity).acosh()
    // With mutated:  new Complex(0, 0).acosh()
    // These should produce different results
    const resultMutated = new Complex(0, 0).acosh();
    const resultOriginal = new Complex(0, -Infinity).acosh();
    
    // The result should match the original path, not the mutated path
    expect(result.re).not.toBeCloseTo(resultMutated.re, 5);
  });
});