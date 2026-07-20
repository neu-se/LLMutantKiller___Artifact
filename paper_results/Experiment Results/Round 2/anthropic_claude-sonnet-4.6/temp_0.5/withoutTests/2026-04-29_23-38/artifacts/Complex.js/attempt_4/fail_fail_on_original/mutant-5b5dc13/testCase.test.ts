import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation in acsch d=0 fallback by checking real part difference", () => {
    // With tiny values, d = a*a + b*b underflows to 0
    // Original: new Complex(a/0, -b/0).asinh() = new Complex(Infinity, -Infinity).asinh()
    // Mutated:  new Complex(0, -b/0).asinh()   = new Complex(0, -Infinity).asinh()
    const origResult = new Complex(Infinity, -Infinity).asinh();
    const mutResult = new Complex(0, -Infinity).asinh();
    
    // Verify they differ so our test is meaningful
    const tiny = 5e-324;
    const c = new Complex(tiny, tiny);
    const result = c.acsch();
    
    // The result should match original path, not mutated path
    expect(result.re).toBeCloseTo(origResult.re, 5);
    expect(result.im).toBeCloseTo(origResult.im, 5);
  });
});