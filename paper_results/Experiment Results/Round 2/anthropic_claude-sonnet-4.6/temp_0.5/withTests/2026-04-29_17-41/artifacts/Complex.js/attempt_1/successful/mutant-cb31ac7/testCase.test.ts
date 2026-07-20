import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 via expm1", () => {
  it("should compute expm1 correctly for small imaginary values, detecting the cosm1 sign mutation", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // real part = 0 + cosm1(0.1) = cos(0.1) - 1
    const x = 0.1;
    const result = new Complex(0, x).expm1();
    const expected = Math.cos(x) - 1;
    // The mutation changes -1/720 to +1/720 in the Taylor series, causing a wrong result
    expect(result.re).toBeCloseTo(expected, 10);
  });
});