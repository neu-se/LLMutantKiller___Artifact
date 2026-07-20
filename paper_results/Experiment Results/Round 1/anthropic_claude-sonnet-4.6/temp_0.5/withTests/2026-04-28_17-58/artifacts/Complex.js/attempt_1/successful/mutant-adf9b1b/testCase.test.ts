import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part uses cosm1 correctly", () => {
  it("should compute expm1 accurately for purely imaginary input with small argument", () => {
    // expm1(0 + b*i) real part = expm1(0)*cos(b) + cosm1(b) = 0 + (cos(b) - 1) = cos(b) - 1
    // cosm1 is used when |b| <= pi/4, so b=0.1 triggers the Taylor series path
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    
    // Expected real part: cos(0.1) - 1
    const expectedRe = Math.cos(b) - 1;
    // Expected imaginary part: exp(0) * sin(0.1) = sin(0.1)
    const expectedIm = Math.sin(b);
    
    // The original code computes cosm1 via Taylor series (Horner's method)
    // The mutated code uses division instead of multiplication, giving wrong result
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});