import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part (tests cosm1 function)", () => {
  it("should correctly compute expm1 for a purely imaginary small value", () => {
    // expm1(0 + 0.1i) real part = Math.expm1(0) * Math.cos(0.1) + cosm1(0.1)
    //                           = 0 * Math.cos(0.1) + (Math.cos(0.1) - 1)
    //                           = Math.cos(0.1) - 1
    // The mutation changes cosm1 computation for small |x| <= pi/4,
    // producing a wrong result.
    const z = new Complex(0, 0.1);
    const result = z.expm1();

    const expectedRe = Math.cos(0.1) - 1; // cosm1(0.1) = cos(0.1) - 1
    const expectedIm = Math.exp(0) * Math.sin(0.1); // = sin(0.1)

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});