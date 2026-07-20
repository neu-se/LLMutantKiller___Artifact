import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot d=0 branch", () => {
  it("acot with zero input uses correct sign for imaginary infinity", () => {
    // When a=0, b=0: early return triggers, so we need to reach d===0 another way.
    // The d===0 branch is reached when a*a + b*b === 0 but b !== 0.
    // This can happen with signed zeros: b = -0 satisfies b !== 0 is false,
    // but let's try to reach via a complex with a=0, b=0 bypassing early return.
    // Actually, let's test acot on a value that exercises the atan() call path
    // with the constructed complex having a specific imaginary sign.
    // 
    // The only way to reach d===0 with b!==0 would be if a=NaN somehow cancels.
    // Let's try: pass complex where re=0, im=0 but through object notation
    // to see if there's any path difference.
    
    // Test that acot(0+0i) returns the correct value (early return path)
    const result = new Complex(0, 0).acot();
    // b===0 so early return: Math.atan2(1, 0) = PI/2
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
    
    // Now test a value near zero to see if sign of imaginary matters
    // acot(0 + epsilon*i) should have a specific imaginary sign
    const eps = 1e-300;
    const result2 = new Complex(0, eps).acot();
    // d = eps^2, a/d = 0, -b/d = -eps/eps^2 = -1/eps = large negative
    // With mutation: +b/d = +1/eps = large positive
    expect(result2.im).toBeLessThan(0);
  });
});