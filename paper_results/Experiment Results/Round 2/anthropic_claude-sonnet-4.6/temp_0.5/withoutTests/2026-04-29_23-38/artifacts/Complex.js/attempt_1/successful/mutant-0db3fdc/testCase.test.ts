import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary part", () => {
  it("should correctly compute expm1 for a purely imaginary number close to zero", () => {
    // The cosm1 function is used in expm1: expm1(a + ib) uses cosm1(b)
    // cosm1(x) computes cos(x) - 1 using Taylor series for small x
    // The mutation changes the Taylor series computation, which affects accuracy
    // for small x values within [-π/4, π/4]
    
    // Use a small imaginary value to trigger the Taylor series path in cosm1
    const x = 0.1; // small value within [-π/4, π/4]
    const c = new Complex(0, x);
    const result = c.expm1();
    
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // = 0*cos(0.1) + (cos(0.1) - 1) + i*sin(0.1)
    // = cos(0.1) - 1 + i*sin(0.1)
    
    const expectedRe = Math.cos(x) - 1;
    const expectedIm = Math.sin(x);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});