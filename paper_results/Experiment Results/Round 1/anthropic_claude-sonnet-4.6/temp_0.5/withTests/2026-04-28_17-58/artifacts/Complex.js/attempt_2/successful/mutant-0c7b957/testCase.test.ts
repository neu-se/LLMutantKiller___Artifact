import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    // atanh(2 + 2i)
    // With original code: d = oneMinus * oneMinus + b * b = (-1)^2 + 2^2 = 1 + 4 = 5
    // With mutated code:  d = oneMinus * oneMinus + b / b = (-1)^2 + 2/2 = 1 + 1 = 2
    // These produce different denominators, yielding different results
    
    const result = new Complex(2, 2).atanh();
    
    // Computed from original code logic:
    // oneMinus = -1, onePlus = 3, d = 5
    // x_re_part = (3*(-1) - 4)/5 = -7/5 = -1.4
    // x_im_part = (2*(-1) + 3*2)/5 = 4/5 = 0.8
    // result.re = logHypot(-1.4, 0.8) / 2 = log(2.6) / 4
    // result.im = atan2(0.8, -1.4) / 2
    
    const expectedRe = Math.log(2.6) / 4;
    const expectedIm = Math.atan2(0.8, -1.4) / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});