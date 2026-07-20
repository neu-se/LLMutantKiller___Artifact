import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return correct real part for acosh when imaginary part of intermediate acos result is positive", () => {
    // For z = 0 + 2i:
    // acos(2i) has re = pi/2 and im > 0
    // In else branch: tmp = im, res.im = -re = -pi/2, res.re = tmp (im value)
    // Mutant keeps res.re = pi/2 (original acos re) instead of tmp (acos im)
    const c = new Complex(0, 2);
    const acos = c.acos();
    // Verify acos has positive im so else branch is taken
    expect(acos.im).toBeGreaterThan(0);
    
    const result = c.acosh();
    // In original: re = acos.im, im = -acos.re
    // In mutant:   re = acos.re (WRONG), im = -acos.re
    expect(result.re).toBeCloseTo(acos.im, 10);
    expect(result.re).not.toBeCloseTo(acos.re, 5);
  });
});