import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for real number greater than 1 checking re of result", () => {
    // acosh(2) = 1.3169578969248166 (real result)
    // acos(2).im < 0, so if branch taken
    // if branch: tmp = res.re; res.re = -res.im; this['re'] = tmp (mutant: this[""] = tmp)
    // res.re becomes -res.im (the correct acosh real part)
    // In mutant, this[""] = tmp has no effect on res, so res.re = -res.im still
    // Hmm, but res.im is set to tmp in original? Let me re-read...
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(Math.acosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
    // After acosh, c itself should be unchanged
    expect(c.re).toBeCloseTo(2, 10);
  });
});