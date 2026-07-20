import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should correctly compute expm1 for a purely imaginary number with small imaginary part", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    //                 = 0 + (cos(0.1) - 1) + i*sin(0.1)
    // The real part depends on cosm1(0.1) which uses the Taylor series
    // Original: uses xx / 20922789888000 (correct)
    // Mutated: uses xx * 20922789888000 (incorrect, massively wrong)
    const result = new Complex(0, 0.1).expm1();
    const expectedRe = Math.cos(0.1) - 1; // approximately -0.004995834721...
    const expectedIm = Math.sin(0.1);     // approximately 0.099833416...

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});