import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function via expm1', () => {
  it('should correctly compute expm1 for purely imaginary input using accurate cosm1 Taylor series', () => {
    // expm1(0 + 0.1i) = exp(0)*cos(0.1) - 1 + i*exp(0)*sin(0.1)
    //                 = cos(0.1) - 1 + i*sin(0.1)
    // The real part uses cosm1(0.1) = cos(0.1) - 1
    // The mutation changes -1/720 to +1/720 in the Taylor series
    // causing an error of 2/720 * (0.1)^6 ≈ 2.78e-9
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    const expectedRe = Math.cos(0.1) - 1;
    const expectedIm = Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});