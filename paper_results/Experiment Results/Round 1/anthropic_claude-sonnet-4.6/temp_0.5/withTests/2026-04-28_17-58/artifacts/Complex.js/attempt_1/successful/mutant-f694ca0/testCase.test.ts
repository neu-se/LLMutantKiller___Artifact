import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 via expm1", () => {
  it("should correctly compute expm1 for a small imaginary value, detecting cosm1 mutation", () => {
    // expm1(0 + 0.1i) real part = expm1(0)*cos(0.1) + cosm1(0.1)
    //                           = 0 + (cos(0.1) - 1)
    //                           ≈ -0.004995834721...
    const result = new Complex(0, 0.1).expm1();
    const expected = Math.cos(0.1) - 1; // ≈ -0.004995834721...
    expect(result.re).toBeCloseTo(expected, 10);
  });
});