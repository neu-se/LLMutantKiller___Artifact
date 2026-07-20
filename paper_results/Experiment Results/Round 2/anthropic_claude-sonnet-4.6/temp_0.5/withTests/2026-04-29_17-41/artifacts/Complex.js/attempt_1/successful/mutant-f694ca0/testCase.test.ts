import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary argument uses correct cosm1 Taylor series", () => {
  it("should compute expm1 of a purely imaginary number accurately using correct cosm1 coefficients", () => {
    // expm1(0 + 0.1i) real part = expm1(0)*cos(0.1) + cosm1(0.1)
    //                           = 0 * cos(0.1) + (cos(0.1) - 1)
    //                           = cos(0.1) - 1
    // The cosm1 function uses a Taylor series for small x (within ±π/4)
    // The mutation changes `+ 1 / 40320` to `+ 1 * 40320` in the Taylor series,
    // which would produce a wildly incorrect result.
    
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    
    // Expected real part: cos(0.1) - 1
    const expectedRe = Math.cos(b) - 1;
    // Expected imaginary part: exp(0) * sin(0.1) = sin(0.1)
    const expectedIm = Math.sin(b);
    
    // The original should match closely; the mutation would produce a very different real part
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});