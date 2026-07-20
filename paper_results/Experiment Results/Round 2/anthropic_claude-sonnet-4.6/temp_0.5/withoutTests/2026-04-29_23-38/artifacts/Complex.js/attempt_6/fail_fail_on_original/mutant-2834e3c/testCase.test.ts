import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('detects mutation when a=0 and b is tiny causing d underflow', () => {
    // a=0, b=5e-200: d = 0 + (5e-200)^2 = 0 (underflow), isZero() false since b != 0
    // Original: new Complex((0!==0)?0/0:0, (5e-200!==0)?-5e-200/0:0) = new Complex(0, -Infinity).acosh()
    // Mutated:  new Complex((0!==0)?0/0:0, (false)?-5e-200/0:0)       = new Complex(0, 0).acosh()
    const c = new Complex(0, 5e-200);
    const result = c.asech();
    const originalExpected = new Complex(0, -Infinity).acosh();
    const mutatedExpected = new Complex(0, 0).acosh();
    
    // Verify original and mutated expectations actually differ
    // new Complex(0, -Infinity).acosh() vs new Complex(0, 0).acosh()
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
    expect(result.im).toBeCloseTo(originalExpected.im, 5);
  });
});