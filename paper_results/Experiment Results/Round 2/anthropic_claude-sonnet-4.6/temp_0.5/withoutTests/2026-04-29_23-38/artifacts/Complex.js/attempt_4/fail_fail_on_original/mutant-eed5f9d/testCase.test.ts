import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with underflowing d follows original code path not mutant path", () => {
    const tiny = 5e-200;
    // d = tiny*tiny + tiny*tiny = 0 (underflow), a=tiny != 0, b=tiny != 0
    // Original: new Complex(tiny/0, -tiny/0).asinh() = new Complex(Inf, -Inf).asinh()
    // Mutant:   new Complex(0, -tiny/0).asinh()       = new Complex(0, -Inf).asinh()
    
    const originalExpected = new Complex(Infinity, -Infinity).asinh();
    const mutantExpected = new Complex(0, -Infinity).asinh();
    
    const result = new Complex(tiny, tiny).acsch();
    
    // Verify original and mutant paths give different results
    const origRe = isNaN(originalExpected.re) ? 'NaN' : originalExpected.re;
    const mutRe = isNaN(mutantExpected.re) ? 'NaN' : mutantExpected.re;
    const origIm = isNaN(originalExpected.im) ? 'NaN' : originalExpected.im;
    const mutIm = isNaN(mutantExpected.im) ? 'NaN' : mutantExpected.im;
    
    // At least one component must differ
    expect(origRe === mutRe && origIm === mutIm).toBe(false);
    
    // Result should match original path
    if (!isNaN(originalExpected.re)) {
      expect(result.re).toBe(originalExpected.re);
    } else {
      expect(result.re).toBeNaN();
    }
    if (!isNaN(originalExpected.im)) {
      expect(result.im).toBe(originalExpected.im);
    } else {
      expect(result.im).toBeNaN();
    }
  });
});