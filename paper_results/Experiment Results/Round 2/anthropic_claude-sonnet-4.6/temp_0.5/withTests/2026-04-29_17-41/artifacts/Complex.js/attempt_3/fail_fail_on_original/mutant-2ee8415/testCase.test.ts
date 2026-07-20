import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a purely imaginary number", () => {
    // For z = 2i, acosh(2i) should have specific re and im values
    // acos(2i) will have im > 0, triggering the else branch
    // The mutation leaves re unchanged instead of swapping correctly
    const result = new Complex(0, 2).acosh();
    
    // acosh(2i) = log(2i + sqrt(-4-1)) = log(2i + sqrt(-5))
    // Expected: re ≈ 1.4436354751788103, im ≈ 1.1071487177940904
    const expected = new Complex(0, 2).acos();
    
    // After correct swap (else branch, im > 0): re = old_im, im = -old_re
    const correctRe = expected.im;
    const correctIm = -expected.re;
    
    expect(result.re).toBeCloseTo(correctRe, 10);
    expect(result.im).toBeCloseTo(correctIm, 10);
  });
});