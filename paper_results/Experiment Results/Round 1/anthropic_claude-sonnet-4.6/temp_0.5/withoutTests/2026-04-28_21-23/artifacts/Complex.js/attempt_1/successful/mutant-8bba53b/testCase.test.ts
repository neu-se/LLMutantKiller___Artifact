import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 polynomial correctness via expm1", () => {
  it("should compute expm1 with correct cosm1 Taylor series (sign of 1/3628800 term)", () => {
    // expm1(0 + i*b) real part = cosm1(b) = cos(b) - 1
    // The mutation changes -1/3628800 to +1/3628800 in the Taylor series
    // Use b near pi/4 to maximize the difference while staying in the Taylor series branch
    const b = Math.PI / 4;
    const c = new Complex(0, b);
    const result = c.expm1();
    
    // Expected: real part = cos(b) - 1, imaginary part = sin(b)
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    // The mutation introduces an error of about 2 * (b^2)^3 / 3628800
    // For b = pi/4: error ≈ 2 * (pi/4)^6 / 3628800 ≈ 6.5e-8
    // Use tolerance smaller than mutation error but larger than floating point noise
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 15);
  });
});