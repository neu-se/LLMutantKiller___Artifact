import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of complex number with zero real and nonzero imaginary should give correct angle", () => {
    // log(0 + 1i) = log(i) = 0 + i*pi/2
    // atan2(1, 0) = pi/2
    // logHypot(0, 1) = log(1) = 0
    const result = new Complex(0, 1).log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});