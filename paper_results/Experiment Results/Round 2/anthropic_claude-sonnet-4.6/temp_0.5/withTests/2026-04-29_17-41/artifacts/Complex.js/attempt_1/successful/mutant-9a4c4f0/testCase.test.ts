import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 accurately for small imaginary values where cosm1 is used", () => {
    // The expm1 method uses cosm1(b) internally:
    // exp(a + i*b) - 1 = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
    // For a=0, b=small: expm1(0)*cos(b) + cosm1(b) = 0*cos(b) + cosm1(b) = cosm1(b)
    // cosm1(b) = cos(b) - 1
    // For small b (within -PI/4 to PI/4), the Taylor series is used
    // The mutation changes the Taylor series computation, so the result will differ

    const smallAngle = 0.1; // within -PI/4 to PI/4 range
    const c = new Complex(0, smallAngle);
    const result = c.expm1();

    // Expected: expm1(0)*cos(0.1) + cosm1(0.1) = 0 + (cos(0.1) - 1)
    // = cos(0.1) - 1
    const expectedRe = Math.cos(smallAngle) - 1;
    const expectedIm = Math.exp(0) * Math.sin(smallAngle);

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});