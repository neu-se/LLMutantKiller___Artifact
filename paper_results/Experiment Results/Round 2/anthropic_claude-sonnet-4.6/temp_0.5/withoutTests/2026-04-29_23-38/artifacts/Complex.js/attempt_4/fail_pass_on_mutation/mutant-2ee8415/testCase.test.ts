import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a purely imaginary number", () => {
    // For acosh(2i), the else branch is taken since acos(2i).im > 0
    // Original: re = old_im (positive ~1.4436), im = -old_re
    // Mutated: re stays as acos(2i).re (which is PI/2), im = -old_re
    const result = new Complex(0, 2).acosh();
    
    // The real part should NOT be PI/2
    expect(result.re).not.toBeCloseTo(Math.PI / 2, 5);
    // The real part should be approximately 1.4436354751788099
    expect(result.re).toBeCloseTo(1.4436354751788099, 10);
  });
});