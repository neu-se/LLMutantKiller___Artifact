import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('should compute acsc with subnormal imaginary part using correct sign', () => {
    const tiny = 5e-324; // smallest positive denormalized float; tiny*tiny underflows to 0
    // a=0, b=tiny: early return skipped (b !== 0), d = 0*0 + tiny*tiny = 0
    // original: new Complex(0, -tiny/0).asin() = new Complex(0, -Infinity).asin()
    // mutated:  new Complex(0, +tiny/0).asin() = new Complex(0, +Infinity).asin()
    const result = new Complex(0, tiny).acsc();
    const originalExpected = new Complex(0, -Infinity).asin();
    const mutatedExpected = new Complex(0, Infinity).asin();
    // Verify the two paths give different results
    expect(originalExpected.im).not.toBe(mutatedExpected.im);
    // The result should match the original path
    expect(result.im).toBe(originalExpected.im);
  });
});