import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("asech with subnormal input: result should differ between a/0 and a*0 paths", () => {
    const tiny = 5e-324; // smallest positive double - its square underflows to 0
    expect(tiny * tiny).toBe(0); // confirm underflow
    expect(tiny).not.toBe(0);    // confirm a != 0
    
    // With original code (a/0 = Infinity): new Complex(Infinity, 0).acosh()
    // With mutated code (a*0 = 0):         new Complex(0, 0).acosh()
    const fromInfinity = new Complex(Infinity, 0).acosh();
    const fromZero = new Complex(0, 0).acosh();
    
    // First verify these two actually differ so our test is meaningful
    const resDiffer = (fromInfinity.re !== fromZero.re) || (fromInfinity.im !== fromZero.im);
    expect(resDiffer).toBe(true);
    
    const result = new Complex(tiny, 0).asech();
    
    // Result should match the fromInfinity path (original), not fromZero (mutated)
    // Use a property that differs between the two
    if (fromInfinity.re !== fromZero.re) {
      expect(result.re).toBe(fromInfinity.re);
    } else {
      expect(result.im).toBe(fromInfinity.im);
    }
  });
});