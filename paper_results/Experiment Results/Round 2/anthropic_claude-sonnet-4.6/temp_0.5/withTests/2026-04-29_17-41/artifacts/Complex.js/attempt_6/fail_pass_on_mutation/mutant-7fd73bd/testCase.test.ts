import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("should compute log of a complex number with negative real part and positive imaginary part", () => {
    // log(-1 + 1i): re = log(sqrt(2)) = 0.5*log(2), im = atan2(1,-1) = 3*pi/4
    const result = new Complex(-1, 1).log();
    expect(result.re).toBeCloseTo(0.5 * Math.log(2), 10);
    expect(result.im).toBeCloseTo(3 * Math.PI / 4, 10);
  });
});