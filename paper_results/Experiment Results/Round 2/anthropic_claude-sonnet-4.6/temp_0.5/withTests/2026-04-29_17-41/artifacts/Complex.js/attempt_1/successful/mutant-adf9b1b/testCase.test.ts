import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary part", () => {
  it("should correctly compute expm1 for a complex number with small imaginary component using accurate cosm1 Taylor series", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // Real part: Math.expm1(0)*Math.cos(0.1) + cosm1(0.1)
    //          = 0 * cos(0.1) + (cos(0.1) - 1)
    //          = cos(0.1) - 1
    //          ≈ -0.004995834721974...
    // The mutation changes the Taylor series computation in cosm1, causing incorrect results
    const z = new Complex(0, 0.1);
    const result = z.expm1();

    const expectedRe = Math.cos(0.1) - 1; // cosm1(0.1) since expm1(0) = 0
    const expectedIm = Math.exp(0) * Math.sin(0.1); // = sin(0.1)

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});