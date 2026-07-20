import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("asech with subnormal input triggers d=0 fallback with correct imaginary part", () => {
    const tiny = 5e-324; // smallest positive double
    // Verify preconditions
    expect(tiny * tiny).toBe(0); // underflows to 0
    expect(tiny).not.toBe(0);    // but tiny itself is not 0
    
    // d = tiny*tiny + 0*0 = 0, a = tiny != 0
    // Original code: (a !== 0) ? a / 0 : 0  => Infinity -> new Complex(Infinity, 0).acosh()
    // Mutated code:  (a !== 0) ? a * 0 : 0  => 0        -> new Complex(0, 0).acosh()
    
    // Let's see what acosh(Infinity, 0) vs acosh(0, 0) gives:
    const fromInfinity = new Complex(Infinity, 0).acosh();
    const fromZero = new Complex(0, 0).acosh();
    
    // They should differ - use im part which is more likely to differ cleanly
    const result = new Complex(tiny, 0).asech();
    
    // The result should match acosh(Infinity) not acosh(0)
    expect(result.im).toBeCloseTo(fromInfinity.im, 10);
    expect(result.im).not.toBeCloseTo(fromZero.im, 5);
  });
});